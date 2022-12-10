#!/usr/bin/env bash

set -e

FIXTURE=$1

case $FIXTURE in 
  info)
    FIXTURE='curl http://localhost:4873/jquery'
    ;;
  tarball)
    FIXTURE='curl http://localhost:4873/jquery/-/jquery-3.6.0.tgz'
    ;;
  *)
    echo "no command found"  
    return 1;;
esac

hyperfine --ignore-failure --warmup 1 --min-runs=${B_CONNECTIONS} --show-output --export-json './hyper-results.json' "$FIXTURE"

