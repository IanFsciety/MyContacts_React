const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();
    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    const category = await CategoriesRepository.create({ name });

    response.status(201).json(category);
  }

  async delete(request, response) {
    const { id } = request.params;
    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
