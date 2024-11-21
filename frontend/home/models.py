from django.db import models

class RoomModel(models.Model):
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=100)
    theme = models.JSONField()  # Use JSONField for an array of strings
    colorscheme = models.JSONField()  # Use JSONField for an array of strings
    image = models.ImageField(upload_to='home/pics/')

    def __str__(self):
        return self.name