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


def s3_upload(file, destination):
    try:
        s3.upload_fileobj(
            file,
            "bookbotimg",
            destination,
        )
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
    

def upload_pdf_stream_to_s3(bucket_name, file_stream, file_name, book_id):
    """
    Uploads a PDF stream to an S3 bucket.

    :param bucket_name: Name of the S3 bucket.
    :param file_stream: The file-like object representing the PDF.
    :param file_name: The name of the file.
    :param book_id: The ID of the book.
    :return: None
    """

    full_s3_path = f"books/{book_id}/{file_name}"

    try:
        s3.upload_fileobj(file_stream, bucket_name, full_s3_path)
        print(f"File uploaded successfully to {full_s3_path} in bucket {bucket_name}.")
    except NoCredentialsError:
        print("Credentials not available.")
    except Exception as e:
        print(f"An error occurred: {e}")


# response = s3_retrieve("user_image/user image2.jpg")
# print(response["Body"].read())

# s3_upload()
