from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database import SessionLocal

from models import Usuario

from schemas import LoginSchema

router = APIRouter(prefix="/auth")


# =====================================
# DB
# =====================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =====================================
# LOGIN
# =====================================

@router.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):

    usuario = db.query(Usuario).filter(
        Usuario.correo == data.correo,
        Usuario.password == data.password
    ).first()

    if usuario:

        return {
            "success": True,
            "token": "TOKEN_DE_PRUEBA",
            "usuario": {
                "id": usuario.id,
                "nombre": usuario.nombre
            }
        }

    return {
        "success": False,
        "message": "Credenciales incorrectas"
    }


# =====================================
# REGISTER
# =====================================

@router.post("/register")
def register(data: LoginSchema, db: Session = Depends(get_db)):

    usuario_existente = db.query(Usuario).filter(
        Usuario.correo == data.correo
    ).first()

    if usuario_existente:

        return {
            "success": False,
            "message": "El correo ya está registrado"
        }

    nuevo_usuario = Usuario(
        nombre=data.nombre,
        correo=data.correo,
        password=data.password
    )

    db.add(nuevo_usuario)

    db.commit()

    db.refresh(nuevo_usuario)

    return {
        "success": True
    }