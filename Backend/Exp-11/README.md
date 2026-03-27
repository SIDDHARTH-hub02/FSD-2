## Learning Outcomes

- Understand how to build two simple Flask microservices and run them concurrently.
- Learn how one service can call another using HTTP requests.
- Practice creating service-specific virtual environments and installing Python dependencies per service.
- Verify service health with API endpoints and perform basic request-based testing.
- Implement error handling for missing resources and inter-service communication failures.

## Theory

This experiment demonstrates a basic microservice architecture using Flask. Two separate services were created:

- **Customer Service** on port `5001`, which stores customer data and fetches related order data from the order service.
- **Order Service** on port `5002`, which stores order records and provides endpoints to retrieve user orders and update order status.

The customer service uses the `requests` library to call the order service, showing how microservices communicate over HTTP. Each service runs independently in its own virtual environment, which isolates dependencies and allows services to be developed and tested separately.

The experiment also covers:

- defining REST endpoints in Flask,
- returning JSON responses,
- handling 404 errors for nonexistent customers,
- using `PUT` for updates,
- and starting services in the correct order so dependent calls succeed.
