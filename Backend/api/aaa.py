import os

if __name__ == "__main__":
    current_directory = os.path.dirname(__file__)
    folder_name = "my_folder"  # Replace with the name of your folder
    folder_path = os.path.join(current_directory, folder_name)

    print(folder_path)