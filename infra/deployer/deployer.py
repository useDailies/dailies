"""Unpacks a dailies site bundle (tar.gz in s3://<bucket>/_deploy/) into the site bucket.

Event: {"bucket", "key", "distribution", "partial"?: bool, "keep"?: [prefix]}
Sets Content-Type and Cache-Control per file, prunes stale files (except kept
prefixes such as media/), and invalidates the CloudFront distribution.
"""
import mimetypes
import os
import shutil
import tarfile
import time

import boto3

s3 = boto3.client("s3")
cf = boto3.client("cloudfront")
TYPES = {
    ".html": "text/html; charset=utf-8", ".js": "application/javascript", ".css": "text/css",
    ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
    ".tsx": "text/plain; charset=utf-8", ".md": "text/markdown; charset=utf-8", ".mp4": "video/mp4",
    ".txt": "text/plain; charset=utf-8", ".ttf": "font/ttf", ".woff2": "font/woff2",
}


def handler(event, _ctx):
    b, key = event["bucket"], event["key"]
    keep = tuple(event.get("keep", ["media/"]))
    path, root = "/tmp/bundle.tgz", "/tmp/site"
    s3.download_file(b, key, path)
    shutil.rmtree(root, ignore_errors=True)
    os.makedirs(root)
    with tarfile.open(path) as t:
        t.extractall(root, filter="data")
    files = [os.path.join(d, f) for d, _, fs in os.walk(root) for f in fs]
    files.sort(key=lambda p: os.path.relpath(p, root) == "index.html")  # index.html last
    uploaded = []
    for p in files:
        k = os.path.relpath(p, root)
        ext = os.path.splitext(k)[1].lower()
        ct = TYPES.get(ext) or mimetypes.guess_type(k)[0] or "application/octet-stream"
        if k == "index.html":
            cc = "no-cache"
        elif k.startswith("assets/"):
            cc = "public, max-age=31536000, immutable"
        else:
            cc = "public, max-age=3600"
        s3.upload_file(p, b, k, ExtraArgs={"ContentType": ct, "CacheControl": cc})
        uploaded.append(k)
    removed = []
    if not event.get("partial"):
        live = set(uploaded)
        for page in s3.get_paginator("list_objects_v2").paginate(Bucket=b):
            for o in page.get("Contents", []):
                k = o["Key"]
                if k not in live and not k.startswith(keep) and not k.startswith("_deploy/"):
                    s3.delete_object(Bucket=b, Key=k)
                    removed.append(k)
    s3.delete_object(Bucket=b, Key=key)
    inv = cf.create_invalidation(
        DistributionId=event["distribution"],
        InvalidationBatch={"Paths": {"Quantity": 1, "Items": ["/*"]}, "CallerReference": str(time.time())},
    )
    return {"uploaded": len(uploaded), "removed": removed, "invalidation": inv["Invalidation"]["Id"]}
