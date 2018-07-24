#HSA Student Profile
Students who want to pursue their Masters/Phd from University from USA, With the help of this app students can get some suggested university based on their profile, like their GRE, TOEFL/ITELTS, CGPA, Number of Publications, Research Experience, Work Experience etc.

* Students will get the university lists
* Get Insights of Popular states among Bangladeshi Students
* Update Profiles for future data analysis

#Features
Describe Functional and Non-Functional Requirements.
###Functional Requirements:
* Create account
* Login to the app
* Fill up student’s profile informations
* Can see recommend versity lists
* Can see insights of previous students data
* Can shortlist university
* Can change password
* Get email notification for forget password
###Non-Functional Requirements:
* Simple minimal and elegant look
* Enough secured authentication system
* 100% Open Source
* User Friendly and Responsive across devices

#Tools and Resources
* Describe PC configuration, languages and IDE require to develop the project
* PC: Macbook Pro 13.3” i5 8GB Ram.
* Language & Libraries: JavaScript, HTML, CSS, React JS, MongoDB, NodeJS
* Code Editor: Visual Studio Code

#Use Case Design
![alt text][ucd]

#Database Schema
![alt text][dbschema]

#Class Diagram
![alt text][cd]

#APIs
```javascript
ROOT_PATH: /api/auth
        POST   /
        POST   /confirmation
        POST   /reset_password_request
        POST   /validate_token
        POST   /reset_password
ROOT_PATH: /api/users
        POST   /
        GET    /current_user
        PATCH  /current_user
        POST   /uni_bucket
        DELETE /uni_bucket
ROOT_PATH: /api/unilist
        GET    /insights
        POST   /recommend
        POST   /bd
        POST   /selected_uni_list
```

#Screenshots
![alt text][sc1]
![alt text][sc2]
![alt text][sc3]
![alt text][sc4]

#Credits
Higher Study Abroad | Non-profit Organisation
Alamgir Kabir | Course Teacher

**_All the files are copywrited and only for demonstration purpose, using any code from this is copywrite violation._**

[dbschema]: https://github.com/mgorabbani/hsa-react/raw/master/repo_files/databaseSchema.png "Database Schema"
[cd]: https://github.com/mgorabbani/hsa-react/raw/master/repo_files/class-diagram.png "Class Diagram"
[ucd]: https://github.com/mgorabbani/hsa-react/raw/master/repo_files/use-case-diagram.png "Use Case Design"

[sc1]: https://github.com/mgorabbani/hsa-react/raw/master/repo_files/sc1.png "Screenshot"
[sc2]: https://github.com/mgorabbani/hsa-react/raw/master/repo_files/sc2.png "Screenshot"
[sc3]: https://github.com/mgorabbani/hsa-react/raw/master/repo_files/sc3.png "Screenshot"
[sc4]: https://github.com/mgorabbani/hsa-react/raw/master/repo_files/sc4.png "Screenshot"