import useForm from "../lib/useForm";

interface ICreateProductProps {}

export const CreateProduct: React.FC<ICreateProductProps> = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: "Nice Shoes",
    price: 32453,
    description: "These are the best shoes!",
  });

  return (
    <div>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="price"
          value={inputs.price}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        Description
        <input
          type="text"
          id="description"
          name="description"
          placeholder="description"
          value={inputs.description}
          onChange={handleChange}
        />
      </label>

      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </div>
  );
};
