from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from database import Base

class Usuario(Base):

    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)

    nombre = Column(String)

    correo = Column(String, unique=True)

    password = Column(String)

    descripcion = Column(
        String,
        default="Rider de corazón 🏍️"
    )

    foto = Column(
        String,
        nullable=True
    )


class Publicacion(Base):

    __tablename__ = "publicaciones"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer)
    contenido = Column(String)
    imagen = Column(String, nullable=True)
    likes = Column(Integer, default=0)


class Crew(Base):
    __tablename__ = "crews"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    descripcion = Column(String)
    imagen = Column(String)


class SolicitudCrew(Base):
    __tablename__ = "solicitudes_crews"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"))
    crew_id = Column(Integer, ForeignKey("crews.id"))
    estado = Column(String, default="pendiente")

class Comentario(Base):

    __tablename__ = "comentarios"

    id = Column(Integer, primary_key=True, index=True)
    publicacion_id = Column(Integer)
    usuario_id = Column(Integer)
    comentario = Column(String)