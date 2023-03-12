#Installation
1. Make sure you have installed python3 on your computer: https://www.python.org/downloads/
2. Create a virtual env in the current directory of the Readme:
    1. Follow the instructions here: https://code.visualstudio.com/docs/python/environments
3. Run ```python -r requirements.txt```
4. Run ```flask db init```
5. Run ```flask db upgrade```

#Running the Application
1. Run ```flask run```. It will be served at port 5000.
2. There are two endpoints.
    1. Get a GM by username
    
    <em>Username is Required</em>

    Endpoint: ```/api/v1/gm?username={username}&&page={page}```
    Sample Request: ```/api/v1/gm?username=startplaying-team```
    Sample Response:
    ```
    {"image":"https://spg-images.s3.us-west-1.amazonaws.com/f1594795151206x101363153696147000/spg0-hat.jpg","lookUpRequests":"2","numReviews":"6","username":"startplaying-team"}
    ```

    2. Get existing Gms in the db ordered by lookup count desc
    
    Endpoint: ```/api/v1/popularity```
    Sample Response:
    ```
    [{"image":"None","lookUpRequests":"15","numReviews":"1","username":"jgollhardt"},{"image":"None","lookUpRequests":"5","numReviews":"0","username":"1586893957446x969952224579254300"},{"image":"https://spg-images.s3.us-west-1.amazonaws.com/f1588789310279x710910621560857600/66449758_10158660236243206_8001790682542899200_o.jpg","lookUpRequests":"4","numReviews":"17","username":"totalpartychill"}]
    ```



