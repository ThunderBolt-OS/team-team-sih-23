import multiprocessing


bind = "0.0.0.0:8002"
workers = multiprocessing.cpu_count() * 2 + 1
threads = 2
timeout = 120
# worker_class = "uvicorn.workers.UvicornWorker"
