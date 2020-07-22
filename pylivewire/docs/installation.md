# Installation

For now you can clone the repo and add its root directory to the python path by executing these commands.

```bash
git clone repo
cd pylivewire
virtualenv venv
source ./venv/bin/activate
pip install -r requirements.txt
cd todo-on-steroids
PYTHONPATH="$PYTHONPATH:/repo/location/" FLASK_APP=todo flask run
goto localhost:5000
```