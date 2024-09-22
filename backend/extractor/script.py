from subprocess import run
from time import sleep

# Path and name to the script
file_path = "main.py" 

# Run the shell script multiple times until it finishes all the test scenarios
# This is needed due to the VRAM memory exceptions that need the subprocess to cease so we can free the VRAM to restart the execution
def start_script():
    try:
        print("Starting execution...")
        run("python "+ file_path, check=True, shell=True)
    except Exception as e:
        # Script crashed, lets restart it!
        print("Script cessou execução por conta da seguinte exceção: ")
        print(e)

        handle_crash()

def handle_crash():
    sleep(10)  # Restarts the script after 10 seconds
    start_script()

start_script()