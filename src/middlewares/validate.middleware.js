export function validateModel(model) {
	return (req, res, next) => {
		const { error } = model.validate(req.body, { abortEarly: false });

		if (error) {
			const errorMessages = error.details.map((err) => err.message);
			return res.status(400).send(errorMessages);
		}

		next();
	};
}