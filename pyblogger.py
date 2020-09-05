import logging
import argparse

Logger = logging.getLogger()

def __main__():
    parser = argparse.ArgumentParser()
    parser.add_argument("--log_level", type=str, default="info")


if __name__ == "__main__":
    __main__()