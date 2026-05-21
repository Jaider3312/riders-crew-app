from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Crew
from models import SolicitudCrew
from schemas import CrewRequestSchema

router = APIRouter(prefix="/crews")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def obtener_crews(search: str = "", db: Session = Depends(get_db)):

    crews = db.query(Crew)

    if search:
        crews = crews.filter(Crew.nombre.contains(search))

    return crews.all()


@router.post("/join")
def unirse_crew(data: CrewRequestSchema, db: Session = Depends(get_db)):

    solicitud = SolicitudCrew(
        usuario_id=data.usuario_id,
        crew_id=data.crew_id,
        estado="pendiente"
    )

    db.add(solicitud)
    db.commit()
    db.refresh(solicitud)

    return {
        "success": True,
        "message": "Solicitud enviada"
    }