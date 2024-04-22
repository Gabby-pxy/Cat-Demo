# How to Run

## For Get:
Change the link to /cats/:id
For example: http://localhost:5000/my-cat-exhibit/us-central1/webApp/cats/1

## For Post:
 curl -X POST \  
  -H "Content-Type: application/json" \
  -d '{
    "Id": 2,
    "Name": "Akira", 
    "Age": 3,
    "PictureUrl": "https://s3-us-west-1.amazonaws.com/assets.wagwalkingweb.com/media/daily_wag/blog_articles/body/1692350986.576679/turkish-angora.jpg"
}' \
  http://localhost:5000/my-cat-exhibit/us-central1/webApp/cats   
  
## For Delete:
 curl -X DELETE \
  http://localhost:5000/my-cat-exhibit/us-central1/webApp/cats/123

## For Put:
 curl -X PUT \   
  -H "Content-Type: application/json" \                         
  -d '{"Name": "Kilala", "Age": 4}' \                  
  http://localhost:5000/my-cat-exhibit/us-central1/webApp/cats/1 
