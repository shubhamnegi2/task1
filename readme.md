📸 Photo Validator - Assignment Submission
Project Description
This is a simple Photo Validator Web Application built using:
HTML5
CSS3
Bootstrap 5
jQuery
jQuery Validate plugin

The application allows the user to validate multiple photo sizes based on minimum allowed size.

Features
1️⃣ Minimum Allowed Size (L x L)
User enters the minimum allowed dimension for width & height.

2️⃣ Number of Photos
User specifies how many photo inputs they want to validate.

3️⃣ Dynamic Inputs
Based on number of photos, dynamic input fields for Width & Height are generated for each photo.

4️⃣ Validations
Form 1:
Minimum Allowed Size: Required, numeric only, max 6 digits.

Number of Photos: Required, numeric only, max 2 digits.

Form 2 (Dynamic Inputs):
Width: Required, numeric only.

Height: Required, numeric only.

If non-numeric input is given (e.g. 123xyz), error message shown.

Real-time numeric-only restriction via onkeypress & oninput.

5️⃣ Validation Result Logic:
Condition	Output
If W < L or H < L	UPLOAD ANOTHER
If W == H (square photo)	ACCEPTED
If W != H and >= L	CROP IT
If invalid input	INVALID INPUT

6️⃣ Result Display
After validation, results are shown for each photo as list items.

Additional Notes
Full responsive layout using Bootstrap 5.

Input fields automatically remove error message once corrected.

Smooth scroll after validation.

Code is fully modular, clean and easy to extend.