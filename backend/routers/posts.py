from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Publicacion
from models import Usuario
from models import Comentario

from schemas import PostSchema
from schemas import ComentarioSchema

router = APIRouter(prefix="/posts")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# =========================================
# OBTENER POSTS
# =========================================

@router.get("/")
def obtener_posts(db: Session = Depends(get_db)):

    posts = (
        db.query(Publicacion, Usuario)
        .join(Usuario, Publicacion.usuario_id == Usuario.id)
        .order_by(Publicacion.id.desc())
        .all()
    )

    resultado = []

    for post, usuario in posts:

        resultado.append({
            "id": post.id,
            "contenido": post.contenido,
            "imagen": post.imagen,
            "likes": post.likes,
            "usuario_id": usuario.id,
            "usuario_nombre": usuario.nombre
        })

    return resultado


# =========================================
# CREAR POST
# =========================================

@router.post("/")
def crear_post(data: PostSchema, db: Session = Depends(get_db)):

    nuevo_post = Publicacion(
        usuario_id=data.usuario_id,
        contenido=data.contenido,
        imagen=data.imagen,
        likes=0
    )

    db.add(nuevo_post)

    db.commit()

    db.refresh(nuevo_post)

    return {
        "success": True,
        "post": nuevo_post
    }


# =========================================
# DAR LIKE
# =========================================

@router.post("/{post_id}/like")
def dar_like(post_id: int, db: Session = Depends(get_db)):

    post = db.query(Publicacion).filter(
        Publicacion.id == post_id
    ).first()

    if post:

        post.likes += 1

        db.commit()

        return {
            "success": True,
            "likes": post.likes
        }

    return {
        "success": False
    }


# =========================================
# CREAR COMENTARIO
# =========================================

@router.post("/comment")
def crear_comentario(
    data: ComentarioSchema,
    db: Session = Depends(get_db)
):

    nuevo_comentario = Comentario(
        publicacion_id=data.publicacion_id,
        usuario_id=data.usuario_id,
        comentario=data.comentario
    )

    db.add(nuevo_comentario)

    db.commit()

    db.refresh(nuevo_comentario)

    return {
        "success": True
    }


# =========================================
# OBTENER COMENTARIOS
# =========================================

@router.get("/{post_id}/comments")
def obtener_comentarios(
    post_id: int,
    db: Session = Depends(get_db)
):

    comentarios = (
        db.query(Comentario, Usuario)
        .join(Usuario, Comentario.usuario_id == Usuario.id)
        .filter(Comentario.publicacion_id == post_id)
        .all()
    )

    resultado = []

    for comentario, usuario in comentarios:

        resultado.append({
            "id": comentario.id,
            "comentario": comentario.comentario,
            "usuario": usuario.nombre
        })

    return resultado