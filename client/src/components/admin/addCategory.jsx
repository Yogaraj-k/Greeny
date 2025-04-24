import "../../styles/admin/addcategory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function AddCategory() {
	return (
		<div className="add-category-form">
			<div className="head">
				<h6>Create New Form</h6>
			</div>

			<div className="add-image">
				<div className="add-image-text left">
					<h3>Image</h3>
					<p>Upload your category image here</p>
				</div>
				<div className="input-container right">
					<div className="image-input">
						<div>
							<label htmlFor="category-image">
								<span style={{ fontSize: "256%" }}>
									<FontAwesomeIcon icon={faUpload} />
								</span>
								<br />
								<br />
								<span>
									<span style={{ color: "#009f7f" }}>Upload image</span>
									<br />
									<br />
									JPG, PNG
								</span>
							</label>
						</div>

						<input type="file" name="category-image" id="category-image" style={{ display: "none" }} />
					</div>
				</div>
			</div>

			<div className="description">
				<div className="description-text left">
					<h3>Description</h3>
					<p>Add your category details and necessary information from here</p>
				</div>
				<div className="input-container right">
					<div className="description-form">
						<div className="name">
							<label htmlFor="description-name">Name</label>
							<input type="text" name="Name" id="description-name" />
						</div>
						<div className="details-text">
							<label htmlFor="details">Details</label>
							<textarea name="details" id="details" cols="10" rows="5"></textarea>
							<div className="select-icon-list">
								<label htmlFor="select-icon">Select Icon</label>
								<select name="select-icon" id="select-icon">
									<option value="icon1">Icon 1</option>
									<option value="icon2">Icon 2</option>
									<option value="icon3">Icon 3</option>
								</select>
							</div>
							<div className="select-type-list type">
								<label htmlFor="select-type">Types</label>
								<select name="select-type" id="select-type">
									<option value="type1">Type 1</option>
									<option value="type2">Type 2</option>
									<option value="type2">Type 3</option>
								</select>
							</div>
							<div className="select-category-list parent-category">
								<label htmlFor="select-category">Parent Category</label>
								<select name="select-category" id="select-category">
									<option value="category1">Category 1</option>
									<option value="category2">Category 2</option>
									<option value="category3">Category 3</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="add-category-button">
				<button className="add-category-btn">Add Category</button>
			</div>
		</div>
	);
}

export default AddCategory;
