exports.createPostValidator = (req, res, next) => {
    //Title
    req.check('title', 'Write a title').notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters').isLength({
        min:4,
        max:150
    });

    req.check('body', 'Write a body').notEmpty();
    req.check('body', 'Body must be between 4 to 2000 characters').isLength({
        min:4,
        max:2000
    });

    const errors = req.validationErrors();
    //Show errors as they appear
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return  res.status(400).json({error: firstError});
    }
    //Proceed to next middleware
    next();
};


exports.userSignUpValidator = (req, res, next) => {
    //Name Validation
    req.check('name', 'Name is required').notEmpty();
    req.check('name')
        .isLength({
            min:4,
            max:150
        })
        .withMessage('Name must be between 4 to 150 characters');

    //Email Validation
    req.check('email', 'Email must be between 3 to 32 Characters')
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 2000
        });


    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({
            min:4
        })
        .withMessage("Password must contain at least 6 characters")
        .isLength({
            min: 6
        })
        .matches(/\d/)
        .withMessage("Password must contain a number");

    const errors = req.validationErrors();
    //Show errors as they appear
    if(errors){
        const firstError = errors.map((error) => error.msg)[0];
        return  res.status(400).json({error: firstError});
    }
    //Proceed to next middleware
    next();
};