import { DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

function ProductCreateForm({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
  setLocation,
  handleImageCloud,
}) {
  const { title, description, price, location } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={(e) => {
              handleImageChange(e.target.files);
            }}
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />

        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="form-control m-2"
          value={description}
        />

        <input
          name="location"
          className="form-control m-2"
          placeholder="Aarhus"
          onChange={handleChange}
          value={location}
        />

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, quantity: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Quantity"
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
      </div>

      <DatePicker
        placeholder="From date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />

      <DatePicker
        placeholder="To date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );
};

export { ProductCreateForm };
