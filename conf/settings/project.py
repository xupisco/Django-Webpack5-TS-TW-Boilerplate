import os
from django.utils.translation import gettext_lazy as _

from conf.settings.base import ENV, ROOT_DIR

from conf.settings.initializers.database import *
from conf.settings.initializers.webpack import *
from conf.settings.initializers.logging import *


PROJECT_NAME = 'Hello World'
SECRET_KEY = ENV('SECRET_KEY')
EMAIL_BACKEND = 'django.core.mail.backends.filebased.EmailBackend'
EMAIL_FILE_PATH = os.path.join(ROOT_DIR, '_emails'),

LANGUAGES = (
    ("en-us", _('English')),
    ("pt-br", _('Portuguese (Brazil)')),
)

LANGUAGE_CODE = "pt-br"
USE_I18N = True

EXTERNAL_APPS = [
    'webpack_loader',
]

PROJECT_APPS = [
    'apps.core.apps.CoreConfig',
    'apps.account.apps.AccountConfig', # Custom User Model
    'apps.web.apps.WebConfig'
]
