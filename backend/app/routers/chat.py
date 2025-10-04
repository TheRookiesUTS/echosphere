"""
AI Chat and Analysis endpoints
Powered by DeepSeek V3.1 via OpenRouter
"""
from fastapi import APIRouter
from app.services.ai_service import ai_service
from app.services.cache_service import cache
from app.models.schemas import (
    ChatRequest,
    ChatResponse,
    AnalyzeAreaRequest,
    AnalyzeAreaResponse
)
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["ai"])


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    AI-powered urban planning chatbot
    
    Features:
    - Context-aware responses
    - Urban planning expertise
    - Chat history support
    - Area-specific analysis when area is selected
    
    Request body:
    - **message**: User's message
    - **chatHistory**: Previous conversation (optional)
    - **selectedAreaData**: Selected area context (optional)
    - **sessionId**: Session identifier (optional)
    """
    logger.info(f"Chat request: session={request.sessionId}, has_area={request.selectedAreaData is not None}")
    
    # Get chat history from cache
    history = cache.get_chat_history(request.sessionId)
    
    # If chat history provided in request, use it (overrides cache)
    if request.chatHistory:
        history = [msg.dict() for msg in request.chatHistory]
    
    # Get AI response
    ai_response = await ai_service.chat(
        message=request.message,
        chat_history=history,
        area_data=request.selectedAreaData
    )
    
    # Save to chat history
    cache.save_chat_message(request.sessionId, "user", request.message)
    cache.save_chat_message(request.sessionId, "assistant", ai_response)
    
    return ChatResponse(response=ai_response)


@router.post("/analyze-area", response_model=AnalyzeAreaResponse)
async def analyze_area(request: AnalyzeAreaRequest):
    """
    Comprehensive AI-powered area analysis
    
    Analyzes selected area and provides:
    - Environmental risk assessment
    - Identified issues and challenges
    - Actionable recommendations
    - Priority levels
    - Data-driven insights
    
    Request body:
    - **areaData**: Complete area information including:
        - Area size, population, buildings
        - Heat index, air quality, green coverage
        - Water stress, flood risk
        - Coordinates
    """
    logger.info(f"Area analysis request: area={request.areaData.area} km², pop={request.areaData.population}")
    
    # Get AI analysis
    result = await ai_service.analyze_area(request.areaData)
    
    return AnalyzeAreaResponse(
        analysis=result["analysis"],
        summary=result["summary"]
    )

