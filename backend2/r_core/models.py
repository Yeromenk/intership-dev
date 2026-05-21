from django.db import models

# Create your models here.
from django.db import models


# -------------------------------------------------------------------
# Base mixin for shared API metadata
# -------------------------------------------------------------------

class ApiMetaMixin(models.Model):
    # permission = models.IntegerField()
    # version = models.IntegerField(
    #     
    #     null=True,
    #     blank=True,
    # )
    # entity_name = models.CharField(
    #     max_length=100,
    #     
    # )

    class Meta:
        abstract = True


# -------------------------------------------------------------------
# Simple lookup entities
# -------------------------------------------------------------------

# class Territory(ApiMetaMixin):
#     id = models.BigIntegerField(primary_key=True)

#     code01 = models.CharField(max_length=255)
#     str_value01 = models.CharField(
#         max_length=255,
#         null=True,
#         blank=True,
        
#     )
#     sequence_number = models.IntegerField()

#     row_access = models.JSONField(
#         null=True,
#         blank=True,
#     )
#     ext_ids = models.JSONField(
#         null=True,
#         blank=True,
        
#     )

#     def __str__(self):
#         return self.code01


# class CurrencyConfig(models.Model):
#     places = models.IntegerField()
#     format = models.CharField(max_length=100)

#     def __str__(self):
#         return self.format


# class Currency(ApiMetaMixin):
#     id = models.BigIntegerField(primary_key=True)

#     code01 = models.CharField(max_length=50)
#     code02 = models.CharField(max_length=50)
#     str_value01 = models.CharField(max_length=255)

#     sequence_number = models.IntegerField()

#     row_access = models.JSONField(
#         null=True,
#         blank=True,
        
#     )
#     ext_ids = models.JSONField(
#         null=True,
#         blank=True,
        
#     )

#     config = models.OneToOneField(
#         CurrencyConfig,
#         on_delete=models.CASCADE,
#         related_name="currency",
#     )

#     def __str__(self):
#         return self.code01


# class BusinessCaseType(ApiMetaMixin):
#     id = models.BigIntegerField(primary_key=True)

#     code01 = models.CharField(max_length=255)
#     sequence_number = models.IntegerField()

#     row_access = models.JSONField(
#         null=True,
#         blank=True,
        
#     )
#     ext_ids = models.JSONField(
#         null=True,
#         blank=True,
        
#     )

#     def __str__(self):
#         return self.code01


# class ContactSource(ApiMetaMixin):
#     id = models.BigIntegerField(primary_key=True)

#     code01 = models.CharField(max_length=255)
#     sequence_number = models.IntegerField()

#     row_access = models.JSONField(
#         null=True,
#         blank=True,
        
#     )
#     ext_ids = models.JSONField(
#         null=True,
#         blank=True,
        
#     )

#     def __str__(self):
#         return self.code01


# class SecurityLevel(ApiMetaMixin):
#     id = models.BigIntegerField(primary_key=True)

#     name = models.CharField(max_length=255)
#     locked = models.BooleanField()

#     ext_ids = models.JSONField(
#         null=True,
#         blank=True,
        
#     )

#     def __str__(self):
#         return self.name


# class LosingCategory(ApiMetaMixin):
#     id = models.BigIntegerField(primary_key=True)

#     code01 = models.CharField(max_length=255)
#     primary = models.BooleanField()
#     sequence_number = models.IntegerField()

#     row_access = models.JSONField(
#         null=True,
#         blank=True,
        
#     )
#     ext_ids = models.JSONField(
#         null=True,
#         blank=True,
        
#     )

#     def __str__(self):
#         return self.code01


# -------------------------------------------------------------------
# File
# -------------------------------------------------------------------

# class FileRef(ApiMetaMixin):
#     id = models.BigIntegerField(primary_key=True)

#     content_type = models.CharField(
#         max_length=255,
        
#     )
#     file_name = models.CharField(
#         max_length=255,
        
#     )

#     icon_small_size = models.IntegerField(
        
#     )
#     icon_small_uuid = models.UUIDField(
#         null=True,
#         blank=True,
        
#     )

#     size = models.BigIntegerField()
#     preview = models.BooleanField()

#     uuid = models.UUIDField()

#     icon_medium_uuid = models.UUIDField(
#         null=True,
#         blank=True,
        
#     )
#     icon_medium_size = models.IntegerField(
        
#     )

#     icon_large_uuid = models.UUIDField(
#         null=True,
#         blank=True,
        
#     )
#     icon_large_size = models.IntegerField(
#         null=True,
#         blank=True,
        
#     )

#     def __str__(self):
#         return self.file_name


# -------------------------------------------------------------------
# Company Address
# -------------------------------------------------------------------

# class CompanyAddress(ApiMetaMixin):
#     id = models.BigIntegerField(primary_key=True)

#     # Address
#     address_name = models.CharField(
#         max_length=255,
#         null=True,
#         blank=True,
        
#     )
#     address_street = models.CharField(
#         max_length=255,
#         null=True,
#         blank=True,
        
#     )
#     address_province = models.CharField(
#         max_length=255,
#         null=True,
#         blank=True,
        
#     )
#     address_zip_code = models.CharField(
#         max_length=50,
#         null=True,
#         blank=True,
        
#     )
#     address_city = models.CharField(
#         max_length=255,
        
#     )

#     address_country_code = models.CharField(
#         max_length=10,
        
#     )
#     address_country_name = models.CharField(
#         max_length=255,
        
#     )

#     address_lat = models.FloatField(
#         null=True,
#         blank=True,
        
#     )
#     address_lng = models.FloatField(
#         null=True,
#         blank=True,
        
#     )

#     # Contact info
#     contact_email = models.EmailField(
        
#     )
#     contact_email2 = models.EmailField(
#         null=True,
#         blank=True,
        
#     )

#     contact_tel1 = models.CharField(
#         max_length=100,
        
#     )
#     contact_tel1_normalized = models.CharField(
#         max_length=100,
#         null=True,
#         blank=True,
        
#     )
#     contact_tel1_type = models.CharField(
#         max_length=100,
#         null=True,
#         blank=True,
        
#     )

#     contact_tel2 = models.CharField(
#         max_length=100,
#         null=True,
#         blank=True,
        
#     )
#     contact_tel2_normalized = models.CharField(
#         max_length=100,
#         null=True,
#         blank=True,
        
#     )
#     contact_tel2_type = models.CharField(
#         max_length=100,
#         null=True,
#         blank=True,
        
#     )

#     contact_www = models.URLField(
#         null=True,
#         blank=True,
        
#     )
#     contact_fax = models.CharField(
#         max_length=100,
#         null=True,
#         blank=True,
        
#     )

#     contact_do_not_send_mm = models.BooleanField(
#         default=False,
        
#     )

#     contact_other_contact = models.TextField(
#         null=True,
#         blank=True,
        
#     )

#     territory = models.ForeignKey(
#         Territory,
#         null=True,
#         blank=True,
#         on_delete=models.SET_NULL,
#         related_name="company_addresses",
#     )

#     primary = models.BooleanField(default=False)
#     contact_address = models.BooleanField(
#         default=False,
        
#     )

#     ext_ids = models.JSONField(
#         null=True,
#         blank=True,
        
#     )

#     def __str__(self):
#         return self.address_city


# -------------------------------------------------------------------
# Company
# -------------------------------------------------------------------

# class Company(ApiMetaMixin):
#     id = models.BigIntegerField(primary_key=True)

#     name = models.CharField(max_length=255)

#     reg_number = models.CharField(
#         max_length=100,
        
#     )

#     tax_number = models.CharField(
#         max_length=100,
#         null=True,
#         blank=True,
        
#     )

#     tax_number2 = models.CharField(
#         max_length=100,
#         null=True,
#         blank=True,
        
#     )

#     # primary_address = models.ForeignKey(
#     #     CompanyAddress,
#     #     null=True,
#     #     blank=True,
#     #     on_delete=models.SET_NULL,
#     #     related_name="primary_for_companies",
        
#     # )

#     # contact_address = models.ForeignKey(
#     #     CompanyAddress,
#     #     null=True,
#     #     blank=True,
#     #     on_delete=models.SET_NULL,
#     #     related_name="contact_for_companies",
        
#     # )

#     logo = models.ForeignKey(
#         FileRef,
#         null=True,
#         blank=True,
#         on_delete=models.SET_NULL,
#     )

#     person = models.BooleanField()

#     first_name = models.CharField(
#         max_length=255,
#         null=True,
#         blank=True,
        
#     )

#     last_name = models.CharField(
#         max_length=255,
#         null=True,
#         blank=True,
        
#     )

#     title_before = models.CharField(
#         max_length=255,
#         null=True,
#         blank=True,
        
#     )

#     title_after = models.CharField(
#         max_length=255,
#         null=True,
#         blank=True,
        
#     )

#     ext_ids = models.JSONField(
#         null=True,
#         blank=True,
        
#     )

#     def __str__(self):
#         return self.name


# -------------------------------------------------------------------
# Person
# -------------------------------------------------------------------

class Person(ApiMetaMixin):
    id = models.BigIntegerField(primary_key=True)

    # gender = models.CharField(
    #     max_length=10,
    #     choices=Gender.choices,
    #     null=True,
    #     blank=True,
    # )

    full_name = models.CharField(
        max_length=255,
        
    )

    full_name_without_titles = models.CharField(
        max_length=255,
        
    )

    first_name = models.CharField(
        max_length=255,
        
    )

    last_name = models.CharField(
        max_length=255,
        
    )

    title_before = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        
    )

    title_after = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        
    )

    # notice = models.TextField(
    #     null=True,
    #     blank=True,
    # )

    # photo = models.ForeignKey(
    #     FileRef,
    #     null=True,
    #     blank=True,
    #     on_delete=models.SET_NULL,
    # )

    # salutation = models.CharField(
    #     max_length=255,
    #     null=True,
    #     blank=True,
    # )

    # contact_tel1 = models.CharField(
    #     max_length=100,
    #     null=True,
    #     blank=True,
        
    # )

    # contact_tel1_type = models.CharField(
    #     max_length=100,
    #     null=True,
    #     blank=True,
        
    # )

    # contact_tel2 = models.CharField(
    #     max_length=100,
    #     null=True,
    #     blank=True,
        
    # )

    # contact_tel2_type = models.CharField(
    #     max_length=100,
    #     null=True,
    #     blank=True,
        
    # )

    # contact_email = models.EmailField(
    #     null=True,
    #     blank=True,
        
    # )

    # contact_email2 = models.EmailField(
    #     null=True,
    #     blank=True,
        
    # )

    # contact_www = models.URLField(
    #     null=True,
    #     blank=True,
        
    # )

    # private_country_code = models.CharField(
    #     max_length=10,
    #     null=True,
    #     blank=True,
        
    # )

    # active_user_account = models.BooleanField(
        
    # )

    # ext_ids = models.JSONField(
    #     null=True,
    #     blank=True,
        
    # )

    # security_level = models.ForeignKey(
    #     SecurityLevel,
    #     on_delete=models.PROTECT,
        
    # )

    def __str__(self):
        return self.full_name


# -------------------------------------------------------------------
# Business Case Phase
# # -------------------------------------------------------------------

# class BusinessCasePhase(ApiMetaMixin):

#     class Status(models.TextChoices):
#         ACTIVE = "B_ACTIVE", "Active"
#         WIN = "E_WIN", "Win"
#         LOST = "F_LOST", "Lost"

#     id = models.BigIntegerField(primary_key=True)

#     code01 = models.CharField(max_length=255)

#     color = models.CharField(
#         max_length=50,
#         null=True,
#         blank=True,
#     )

#     status = models.CharField(
#         max_length=20,
#         choices=Status.choices,
#     )

#     probability = models.FloatField(
#         null=True,
#         blank=True,
#     )

#     locked = models.BooleanField()

#     row_access = models.JSONField(
#         null=True,
#         blank=True,
        
#     )

#     sequence_number = models.IntegerField(
        
#     )

#     total_count = models.IntegerField(
#         null=True,
#         blank=True,
        
#     )

#     phase_sequence_number = models.IntegerField(
#         null=True,
#         blank=True,
        
#     )

#     business_case_type = models.ForeignKey(
#         BusinessCaseType,
#         null=True,
#         blank=True,
#         on_delete=models.SET_NULL,
        
#     )

#     ext_ids = models.JSONField(
#         null=True,
#         blank=True,
        
#     )

#     def __str__(self):
#         return self.code01


# -------------------------------------------------------------------
# Business Case
# -------------------------------------------------------------------

class BusinessCase(ApiMetaMixin):

    class Status(models.TextChoices):
        ACTIVE = "B_ACTIVE", "Active"
        WIN = "E_WIN", "Win"
        LOST = "F_LOST", "Lost"

    id = models.BigIntegerField(primary_key=True)

    code = models.CharField(max_length=100)
    name = models.CharField(max_length=255)

    # company = models.ForeignKey(
    #     Company,
    #     on_delete=models.CASCADE,
    #     related_name="business_cases",
    # )

    # person = models.ForeignKey(
    #     Person,
    #     null=True,
    #     blank=True,
    #     on_delete=models.SET_NULL,
    #     related_name="person_business_cases",
    # )

    owner = models.ForeignKey(
        Person,
        on_delete=models.PROTECT,
        related_name="owned_business_cases",
    )

    # currency = models.ForeignKey(
    #     Currency,
    #     on_delete=models.PROTECT,
    # )

    # valid_from = models.DateField(
        
    # )

    # valid_till = models.DateField(
    #     null=True,
    #     blank=True,
        
    # )

    # scheduled_end = models.DateField(
    #     null=True,
    #     blank=True,
        
    # )

    # total_amount = models.DecimalField(
    #     max_digits=15,
    #     decimal_places=2,
        
    # )

    total_amount_in_default_currency = models.IntegerField()

    # tax_amount = models.DecimalField(
    #     max_digits=15,
    #     decimal_places=2,
        
    # )

    # total_amount_with_tax = models.DecimalField(
    #     max_digits=15,
    #     decimal_places=2,
        
    # )

    # base_amount = models.DecimalField(
    #     max_digits=15,
    #     decimal_places=2,
        
    # )

    # estimated_value = models.DecimalField(
    #     max_digits=15,
    #     decimal_places=2,
        
    # )

    # ???
    trading_profit = models.IntegerField(
        
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
    )

    # probability = models.IntegerField()

    exchange_rate = models.FloatField()

    # business_case_type = models.ForeignKey(
    #     BusinessCaseType,
    #     on_delete=models.PROTECT,
        
    # )

    # business_case_phase = models.ForeignKey(
    #     BusinessCasePhase,
    #     on_delete=models.PROTECT,
        
    # )

    # source = models.ForeignKey(
    #     ContactSource,
    #     null=True,
    #     blank=True,
    #     on_delete=models.SET_NULL,
    # )

    # losing_reason = models.TextField(
    #     null=True,
    #     blank=True,
        
    # )

    # losing_category = models.ForeignKey(
    #     LosingCategory,
    #     null=True,
    #     blank=True,
    #     on_delete=models.SET_NULL,
        
    # # )

    # created_at = models.DateTimeField(
        
    # )

    # created_by = models.CharField(
    #     max_length=255,
        
    # )

    # updated_at = models.DateTimeField(
    #     null=True,
    #     blank=True,
        
    # )

    # updated_by = models.CharField(
    #     max_length=255,
    #     null=True,
    #     blank=True,
        
    # )

    # last_modified_at = models.DateTimeField(
        
    # )

    # last_modified_by = models.CharField(
    #     max_length=255,
        
    # )

    # description = models.TextField(
    #     null=True,
    #     blank=True,
    # )

    # tags = models.JSONField(
    #     null=True,
    #     blank=True,
    # )

    # security_level = models.ForeignKey(
    #     SecurityLevel,
    #     on_delete=models.PROTECT,
        
    # )

    # prev_activity = models.TextField(
    #     null=True,
    #     blank=True,
        
    # )

    # next_activity = models.TextField(
    #     null=True,
    #     blank=True,
        
    # )

    # custom_fields = models.JSONField(
    #     null=True,
    #     blank=True,
        
    # )

    # inline_participants = models.JSONField(
    #     null=True,
    #     blank=True,
        
    # )

    # inline_sign = models.JSONField(
    #     null=True,
    #     blank=True,
        
    # )

    # last_phase_change = models.DateTimeField(
    #     null=True,
    #     blank=True,
        
    # )

    # last_phase_change_days = models.IntegerField(
    #     null=True,
    #     blank=True,
        
    # )

    # phase_changes = models.JSONField(
    #     default=list,
        
    # )

    def __str__(self):
        return f"{self.code} - {self.name}"