import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailsProducts,
  listProductCategories,
  listProductFormRelease,
  listProductProviders,
  updateProduct,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import Axios from "axios";

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [provider, setProvider] = useState("");
  const [formRelease, setFormRelease] = useState("");
  const [description, setDescription] = useState("");
  const [isPrescripted, setIsPrescripted] = useState("");
  const [prescript, setPrescript] = useState("");
  const [prescriptVision, setPrescriptVision] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const productFormReleaseList = useSelector(
    (state) => state.productFormReleaseList
  );
  const productProviderList = useSelector((state) => state.productProviderList);

  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  const {
    loading: loadingFormRelease,
    error: errorFormRelease,
    formReleases,
  } = productFormReleaseList;
  const {
    loading: loadingProviders,
    error: errorProviders,
    providers,
  } = productProviderList;
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductCategories());
    dispatch(listProductFormRelease());
    dispatch(listProductProviders());
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProducts(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setProvider(product.provider);
      setFormRelease(product.formRelease);
      setDescription(product.description);
      setPrescript(product.prescript);
      setIsPrescripted(product.isPrescripted);

    }
  }, [product, dispatch, productId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        countInStock,
        description,
        provider,
        formRelease,
        isPrescripted,
        prescript,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  const closeHandler = () => {
    props.history.push("/productlist/");
    window.location.reload(false);
  };

  const handleIsPrescripted = () => {
    console.log("Было:" + isPrescripted);
    setIsPrescripted(!isPrescripted);
  };


  const hashHandler = () => {
    setPrescript(makeid(20));
  };

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
    return result;
  }

  if(prescript == ''){
    setPrescript(makeid(20));
  }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Редактирование товара {productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isPrescripted}
                  onChange={handleIsPrescripted}
                />
                Требуется рецепт?
              </label>
            </div>
            <div style={{ display: isPrescripted ? "flex" : "none" }}>
              <label>Хеш-рецепт для покупки данного препапата:</label>
              <input
                type="input"
                disabled="true"
                style={{ borderRadius: "1rem 1rem 0 0" }}
                value={prescript}
              />
              <button
                type="button"
                style={{ borderRadius: "0 0 1rem 1rem" }}
                onClick={hashHandler}
              >
                Сгенерировать новый хеш-рецепт
              </button>
            </div>

            <div>
              <label htmlFor="name">Наименование</label>
              <input
                id="name"
                type="text"
                placeholder="Введите наименование"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Цена</label>
              <input
                id="price"
                type="text"
                placeholder="Введите цену"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="image">Изображение</label>
              <input
                id="image"
                type="text"
                placeholder="Выберите изображение"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">
                Файл изображения (Соотношение сторон 1x1, png/jpg)
              </label>
              <input
                type="file"
                id="imageFile"
                label="Выберите изображение"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category">Категория</label>
              {loadingCategories ? (
                <LoadingBox></LoadingBox>
              ) : errorCategories ? (
                <MessageBox variant="danger">{errorCategories}</MessageBox>
              ) : (
                <select onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((c) => (
                    <option value={c.name}>{c.name}</option>
                  ))}
                  <option selected value={category}>
                    {category} - Выбрано
                  </option>
                </select>
              )}
            </div>
            <div>
              <label htmlFor="category">Форма выпуска</label>
              {loadingFormRelease ? (
                <LoadingBox></LoadingBox>
              ) : errorFormRelease ? (
                <MessageBox variant="danger">{errorFormRelease}</MessageBox>
              ) : (
                <select onChange={(e) => setFormRelease(e.target.value)}>
                  {formReleases.map((c) => (
                    <option value={c.name}>{c.name}</option>
                  ))}
                  <option selected value={formRelease}>
                    {formRelease} - Выбрано
                  </option>
                </select>
              )}
            </div>
            <div>
              <label htmlFor="category">Поставщик</label>
              {loadingProviders ? (
                <LoadingBox></LoadingBox>
              ) : errorProviders ? (
                <MessageBox variant="danger">{errorProviders}</MessageBox>
              ) : (
                <select onChange={(e) => setProvider(e.target.value)}>
                  {providers.map((c) => (
                    <option value={c.name}>{c.name}</option>
                  ))}
                  <option selected value={provider}>
                    {provider} - Выбрано
                  </option>
                </select>
              )}
            </div>

            <div>
              <label htmlFor="countInStock">Кол-во в наличии</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Введите кол-во"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Описание</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Введите описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Обновить
              </button>
            </div>
          </>
        )}
        <div>
          <label></label>
          <button
            className="shadow"
            style={{ width: "16%", margin: "0 auto 2rem auto" }}
            onClick={closeHandler}
          >
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
}
