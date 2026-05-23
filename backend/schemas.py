from pydantic import BaseModel
from typing import Optional


class LoginSchema(BaseModel):

    nombre: Optional[str] = None

    correo: str

    password: str


class PostSchema(BaseModel):

    usuario_id: int
    contenido: str
    imagen: Optional[str] = None


class CrewRequestSchema(BaseModel):

    usuario_id: int
    crew_id: int


class ComentarioSchema(BaseModel):

    publicacion_id: int
    usuario_id: int
    comentario: str

class PerfilSchema(BaseModel):

    usuario_id: int
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    foto: Optional[str] = None