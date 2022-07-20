exports.getLigneCompta = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                _id: '1',
                date: new Date(),
                montant: 100,
                client: 'Société 1',
                createdAt: new Date()
            }
        ]
    });
};

exports.createLigneCompta = (req, res, next) => {
    console.log(req.body);
    const {date, montant, client} = req.body;
    // Create post in db
    res.status(201).json({
        message: 'Post created successfully!',
        post: { id: new Date().toISOString(), date: new Date(date), montant: montant, client: client }
    });
};