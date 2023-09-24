from rest_framework import permissions


class IsSuperUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.is_admin:
            return True


class IsPassenger(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.role == 'passenger':
            return True


class IsDriver(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and request.user.role == 'driver':
            return True
