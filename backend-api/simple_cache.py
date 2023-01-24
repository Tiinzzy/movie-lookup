import time

CREATE_TIME = 'CREATE-_-TIME'
RESTART_AFTER = 5  # minutes

cache = {CREATE_TIME: time.time()}


def get(key):
    # check for how many seconds has passed since start or last clear
    # and if it is more than RESTART_AFTER, clear the cache
    check_for_clear()

    if key in cache.keys():
        print(get_time(), " => serving {key} data from cache!".format(key=key))
        return cache[key]
    else:
        return None


def put(key, value):
    cache[key] = value
    print(get_time(), " => adding {key} entry to cache, current size is {size}!".format(
        key=key, size=size()))


def get_time():
    return time.ctime(time.time())


def size():
    return len(cache)


def check_for_clear():
    interval = time.time() - cache[CREATE_TIME]
    if interval > RESTART_AFTER * 60:
        cache.clear()
        cache[CREATE_TIME] = time.time()
        print(get_time(), " => clearing the cache!")


def invalidate(key):
    del cache[key]
