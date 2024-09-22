from subprocess import run
from time import sleep

# Path and name to the script you are trying to start
file_path = "main.py"

restart_timer = 2


def start_script():
    try:
        # Make sure 'python' command is available
        print("starting execution")
        run("python " + file_path, check=True, shell=True)
    except Exception as e:
        # Script crashed, lets restart it!
        print("VRAM insuficiente! Reiniciando...")
        print(e)
        handle_crash()


def handle_crash():
    sleep(10)  # Restarts the script after 2 seconds
    start_script()


start_script()
