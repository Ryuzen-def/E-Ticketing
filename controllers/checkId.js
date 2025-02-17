exports.checkId = (req, res) => {
    const { id, passport } = req.query;

    if (!id && !passport) {
        return res.status(400).json({ error: "At least one of ID or passport is required." });
    }

    let query = "SELECT id_user, passport_id FROM ms_user WHERE 1=1";
    const queryParams = [];

    if (id) {
        query += " AND id_user = ?";
        queryParams.push(id);
    }
    if (passport) {
        query += " AND passport_id = ?";
        queryParams.push(passport);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error("Error checking ID or passport:", err.message, err.stack);
            return res.status(500).json({ error: "Internal server error. Please try again." });
        }

        const existsId = results.some((row) => row.id_user === id);
        const existsPassport = results.some((row) => row.passport_id === passport);

        res.status(200).json({ existsId, existsPassport });
    });
};
