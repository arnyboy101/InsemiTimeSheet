from django.contrib.auth.models import AbstractBaseUser, CustomeUserManager

class User(AbstractBaseUser):
    identifier = models.IntegerField(unique=True)
    employeeId = 'identifier'
    email_address = models.EmailField()
    password = models.PasswordField()
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)
    REQUIRED_FIELDS = ['employeeId','email_address','first_name','last_name','created_at','password']

    def create_user(self,employeeId,email_address,first_name,last_name,created_at,password=None):
        self.employeeId = employeeId
        self.email_address = email_address
        self.first_name = first_name
        self.last_name = last_name
        self.created_at = created_at
        self.password = make_random_password(length=32,allowed_chars='abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789!@#$%^&*()')

        

    def create_superuser(self,employeeId,email_address,first_name,last_name,created_at,password=None):
        self.employeeId = employeeId
        self.email_address = email_address
        self.first_name = first_name
        self.last_name = last_name
        self.created_at = created_at
        self.password = make_random_password(length=32,allowed_chars='abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789!@#$%^&*()')


