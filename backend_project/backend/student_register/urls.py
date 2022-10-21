from student_register.views import StudentViewSet
from rest_framework.routers import DefaultRouter
from student_register import views

router = DefaultRouter()
router.register('crud', views.StudentViewSet, basename='student')
urlpatterns = router.urls
