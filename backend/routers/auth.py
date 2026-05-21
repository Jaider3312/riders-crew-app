from fastapi import APIRouter
from schemas import LoginSchema

router = APIRouter(prefix="/auth")

@router.post("/login")
def login(data: LoginSchema):

    if data.correo == "admin@test.com" and data.password == "123456":
        return {
            "success": True,
            "token": "TOKEN_DE_PRUEBA",
            "usuario": {
                "id": 1,
                "nombre": "Admin"
            }
        }

    return {
        "success": False,
        "message": "Credenciales incorrectas"
    }