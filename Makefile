build: build/scripts/build.sh
	sh build/scripts/build.sh

start: build/scripts/start.sh
	sh build/scripts/start.sh

finish: build/scripts/finish.sh
	sh build/scripts/finish.sh

logs: build/scripts/get_logging.sh
	sh build/scripts/get_logging.sh
