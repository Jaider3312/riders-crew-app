from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database import SessionLocal

from models import Usuario

from schemas import PerfilSchema

router = APIRouter(
    prefix="/profile"
)


# =========================================
# DB
# =========================================

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =========================================
# OBTENER PERFIL
# =========================================

@router.get("/{usuario_id}")
def obtener_perfil(
    usuario_id: int,
    db: Session = Depends(get_db)
):

    usuario = db.query(Usuario).filter(
        Usuario.id == usuario_id
    ).first()

    if not usuario:

        return {
            "success": False
        }

    return {
        "success": True,
        "usuario": {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "correo": usuario.correo,
            "descripcion": usuario.descripcion,
            "foto": usuario.foto
        }
    }


# =========================================
# ACTUALIZAR PERFIL
# =========================================

@router.put("/")
def actualizar_perfil(
    data: PerfilSchema,
    db: Session = Depends(get_db)
):

    usuario = db.query(Usuario).filter(
        Usuario.id == data.usuario_id
    ).first()

    if not usuario:

        return {
            "success": False
        }

    if data.nombre is not None:
        usuario.nombre = data.nombre

    if data.descripcion is not None:
        usuario.descripcion = data.descripcion

    if data.foto is not None:
        usuario.foto = data.foto

    db.commit()

    return {
        "success": True
    }