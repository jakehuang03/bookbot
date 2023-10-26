# pip3 install boto3
import boto3 as aws


s3 = aws.client(
    service_name="s3",
    region_name="us-east-2",
    aws_access_key_id="AKIARXGGAUFZQL53JF46",
    aws_secret_access_key="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",
)


def generateUploadURL():
    url = s3.generate_presigned_url(
        ClientMethod="put_object",
        Params={
            "Bucket": "bookbotimg",
            "Key": "testestest",
        },
        ExpiresIn=60,
    )
    return url
