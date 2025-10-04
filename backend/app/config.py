"""
Configuration management for Echosphere Backend
Loads environment variables and provides settings
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # API Keys
    openrouter_api_key: str
    nasa_api_key: str
    
    # OpenRouter Configuration
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    deepseek_model: str = "deepseek/deepseek-chat-v3.1:free"
    
    # NASA Configuration
    nasa_base_url: str = "https://api.nasa.gov"
    eonet_base_url: str = "https://eonet.gsfc.nasa.gov/api/v3"
    
    # Server Configuration
    backend_url: str = "http://localhost:8000"
    frontend_url: str = "http://127.0.0.1:5500"  # Default for Live Server
    
    # Optional: Site info for OpenRouter
    site_url: Optional[str] = None
    site_name: Optional[str] = "Echosphere Urban Resilience"
    
    # Cache TTL (seconds)
    nasa_cache_ttl: int = 3600  # 1 hour
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()

