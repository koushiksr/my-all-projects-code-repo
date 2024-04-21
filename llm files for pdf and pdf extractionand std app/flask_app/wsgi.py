from app import app  # Import your Flask application instance from your main script

if __name__ == "__main__":
    app.env = 'production'  # Set environment to 'production'
    app.run()
