from models import User  # Replace 'your_app' with the actual name of your app module

# Create a test user
test_user = User(username="testuser", password="testpassword", nom="Test", prenom="User", role=["patient"], tel="1234567890", genre="male")
test_user.save()

# Check if the user was created
retrieved_user = User.objects(username="testuser").first()
if retrieved_user:
    print("User created successfully.")
else:
    print("User creation failed.")
