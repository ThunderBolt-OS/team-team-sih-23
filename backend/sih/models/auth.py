from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser)
from django.utils import timezone


class UserManager(BaseUserManager):
    def create_user(self, phone, password=None):
        if not phone:
            raise ValueError('Users must have a phone number')

        user = self.model(phone=phone)
        if password:
            user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, phone, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            phone=phone,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    phone = models.CharField(max_length=14, unique=True)

    # passenger, admin, driver
    role = models.CharField(default='passenger', max_length=55)

    # user data
    name = models.CharField(max_length=55, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)

    # auto handled
    is_admin = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=timezone.now)

    fcm_token = models.CharField(max_length=255, blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = []

    def __str__(self):
        return str(self.phone)

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin

    class Meta:
        db_table = 'Users'


class PhoneOtp(models.Model):
    phone = models.CharField(max_length=14)
    otp = models.PositiveIntegerField()

    session_attempts = models.PositiveIntegerField(default=0)
    lifetime_attempts = models.PositiveIntegerField(default=0)
    limit_attempts = models.PositiveIntegerField(default=20)

    first_attempt = models.DateTimeField(default=timezone.now)
    latest_attempt = models.DateTimeField()

    def __str__(self):
        return f'{self.phone}'

    class Meta:
        db_table = 'PhoneOtp'
