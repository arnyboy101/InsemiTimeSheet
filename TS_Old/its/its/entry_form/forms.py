from django import forms

class Proj(forms.Form):
    proj_name = forms.CharField(label="Enter project name", max_length=256)

