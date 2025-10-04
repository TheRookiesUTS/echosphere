"""
Pydantic models for API request/response validation
"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


# ============================================================================
# Chat Models
# ============================================================================

class ChatMessage(BaseModel):
    """Individual chat message"""
    role: str = Field(..., description="Role: 'user' or 'assistant'")
    content: str = Field(..., description="Message content")


class AreaData(BaseModel):
    """Geospatial area data from frontend"""
    area: float = Field(..., description="Area in km²")
    center: Optional[Dict[str, float]] = Field(None, description="Center coordinates {lat, lng}")
    bounds: Optional[Dict[str, Any]] = Field(None, description="Boundary coordinates")
    heatIndex: float = Field(..., description="Heat index in °C")
    airQuality: int = Field(..., description="Air Quality Index (AQI)")
    greenCoverage: float = Field(..., description="Green coverage percentage")
    waterStress: Optional[float] = Field(None, description="Water stress percentage")
    floodRisk: str = Field(..., description="Flood risk level")
    population: int = Field(..., description="Population estimate")
    buildings: Optional[int] = Field(None, description="Number of buildings")


class ChatRequest(BaseModel):
    """Request for AI chat endpoint"""
    message: str = Field(..., description="User message", min_length=1)
    chatHistory: Optional[List[ChatMessage]] = Field(default=[], description="Previous conversation")
    selectedAreaData: Optional[AreaData] = Field(None, description="Selected area context")
    sessionId: Optional[str] = Field(default="default", description="Session identifier")


class ChatResponse(BaseModel):
    """Response from AI chat endpoint"""
    response: str = Field(..., description="AI assistant response")
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class AnalyzeAreaRequest(BaseModel):
    """Request for area analysis endpoint"""
    areaData: AreaData = Field(..., description="Area data to analyze")


class AreaAnalysisSummary(BaseModel):
    """Summary of area analysis"""
    issues: List[str] = Field(..., description="Identified issues")
    recommendations: List[str] = Field(..., description="Recommendations")
    priorityLevel: str = Field(..., description="Priority level: Low, Medium, High, Critical")


class AnalyzeAreaResponse(BaseModel):
    """Response from area analysis endpoint"""
    analysis: str = Field(..., description="Full analysis report (markdown formatted)")
    summary: AreaAnalysisSummary = Field(..., description="Analysis summary")
    timestamp: datetime = Field(default_factory=datetime.utcnow)


# ============================================================================
# NASA Models
# ============================================================================

class NASAImageryResponse(BaseModel):
    """NASA Earth imagery response"""
    data: Optional[Dict[str, Any]] = Field(None, description="NASA imagery data")
    cached: bool = Field(False, description="Whether response was cached")
    error: Optional[str] = Field(None, description="Error message if any")


class EONETEvent(BaseModel):
    """EONET natural event"""
    id: str
    title: str
    description: Optional[str] = None
    categories: List[Dict[str, Any]]
    geometry: List[Dict[str, Any]]
    link: Optional[str] = None


class EONETResponse(BaseModel):
    """EONET events response"""
    events: List[Dict[str, Any]] = Field(..., description="List of natural events")
    count: int = Field(..., description="Number of events")
    cached: bool = Field(False, description="Whether response was cached")


class NASAPowerResponse(BaseModel):
    """NASA POWER climate data response"""
    data: Optional[Dict[str, Any]] = Field(None, description="Climate data")
    cached: bool = Field(False, description="Whether response was cached")
    error: Optional[str] = Field(None, description="Error message if any")


# ============================================================================
# Health Check
# ============================================================================

class HealthResponse(BaseModel):
    """Health check response"""
    status: str = Field(..., description="Service status")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    services: Dict[str, str] = Field(..., description="Status of external services")

