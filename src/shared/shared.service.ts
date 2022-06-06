import { Document, Model } from 'mongoose';

export class SharedService<T extends Document> {
  private readonly _model: Model<T>;
  private _populateOnFind: string[] = [];

  constructor(model: Model<T>, populateOnFind: string[] = []) {
    this._model = model;
    this._populateOnFind = populateOnFind;
  }

  async getAll(condition = {}): Promise<T[]> {
    return this._model.find(condition).populate(this._populateOnFind).exec();
  }

  async getOne(value: any, queryBy = '_id') {
    const query = {};
    query[queryBy] = value;

    return this._model.findOne(query).populate(this._populateOnFind).exec();
  }

  async getById(id: string) {
    return this._model.findById(id).populate(this._populateOnFind).exec();
  }

  async getByIds(ids: string[]): Promise<T[]> {
    return this._model
      .find({ _id: { $in: ids } })
      .populate(this._populateOnFind)
      .exec();
  }

  async createFromRequestBody(body: Partial<T>): Promise<T> {
    return this._model.create({ ...body });
  }

  async create(resource: T): Promise<T> {
    return this._model.create(resource);
  }

  async updateFromRequestBody(body: Partial<T>): Promise<T> {
    const existed: T = await this._model
      .findById(body._id ? body._id : body.id)
      .exec();

    const updated = { _id: existed._id, ...body };

    return this._model
      .findByIdAndUpdate(updated._id, updated, { new: true })
      .exec();
  }

  async update(updatedResource: any): Promise<any> {
    return this._model
      .findByIdAndUpdate(updatedResource._id, updatedResource, { new: true })
      .exec();
  }

  async deleteOne(id: string): Promise<T> {
    return this._model.findByIdAndDelete(id).exec();
  }

  async delete(condition: Record<string, unknown>): Promise<T> {
    return this._model.remove(condition).exec();
  }
}
