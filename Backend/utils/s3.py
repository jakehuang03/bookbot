# pip3 install boto3
import boto3 as aws
import logging
from botocore.exceptions import ClientError

s3 = aws.client(
    service_name="s3",
    region_name="us-east-2",
    # aws_access_key_id="AKIARXGGAUFZQL53JF46",
    # aws_secret_access_key="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"
    aws_access_key_id="AKIARXGGAUFZX5Q2SH27",
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


# file, destination
def s3_upload():
    try:
        s3.upload_file("Backend/utils/user image.jpg", "bookbotimg", destination)
        # s3.upload_file(file, 'bookbotimg', 'user_image/'+userId+)
    except ClientError as e:
        logging.error(e)


def s3_retrieve(destination):
    try:
        obj = s3.get_object(Bucket="bookbotimg", Key=destination)
    except ClientError as e:
        logging.error(e)
    else:
        return obj


# response = s3_retrieve('user_image/user image.jpg')
# print(response['Body'].read())

s3_upload()
