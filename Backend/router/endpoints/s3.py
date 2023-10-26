# pip3 install boto3
import boto3 as aws
import requests
from .keys import awskey, awssecret
from botocore.client import Config


s3_client = aws.client(
    service_name="s3",
    region_name="us-east-2",
    aws_access_key_id=awskey,
    aws_secret_access_key=awssecret,
    config=Config(signature_version='s3v4')
)


def generateUploadURL():
    url = s3_client.generate_presigned_url(
        ClientMethod="get_object",
        Params={
            "Bucket": "bookbotimg",
            "Key": "testestest",
        },
        ExpiresIn=60,
    )

    return url
