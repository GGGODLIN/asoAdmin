import React, { useState, useRef, useContext, useEffect } from 'react';
import styled from 'styled-components'
import { StyledIconButton } from './Buttons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { BasicContainer, Container, SubContainer } from './Containers';
import { Context } from '../Store/store'
import { Text } from './Texts';
import { Ul, Li } from './Lists';
import { TagClose } from './Tags';

//#region  列表排序遞增遞減旋轉箭頭動畫
const ArrowDropUpIconTrans = styled(ArrowDropUpIcon).attrs((props) => ({}))`

&& {
    //動畫
    animation: ${props => props?.theme?.animation ?? 'initial'};
    animation-fill-mode: forwards;
    position: absolute;
    height: 100%;
    top: 0rem;
    right: 0.3rem;
    color: ${props => props?.theme?.color ?? '#606266'};

    @keyframes iconIncrease {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(180deg);
        }
    }

    @keyframes iconDecrease {
        0% {
            transform: rotate(180deg);
        }

        100% {
            transform: rotate(0deg);
        }
    }
}
`
//#endregion

//#region 表單控件重製

//#region 表單控件最外層包覆，支持Enter 提交
/* 
   Date   : 2020-06-04 18:07:46
   Author : Arhua Ho
   Content: 表單控件最外層包覆，支持Enter 提交
            可傳入props :
                onSubmit : 按Enter後執行的函數
                sumbit : Boolean //預設為 true ，即按Enter可以提交表單
                theme : { 
                    width: "100%",
                    minWidth: "32rem", //表格最小寬度，主要用來防止warp跑版
                }
*/
export const FormControl = (props) => {
    const { Theme } = useContext(Context);
    const { form } = Theme;

    return (
        <BasicContainer theme={props?.theme ?? form.formControl}>
            <form onSubmit={props?.onSubmit}>
                {props.children}
                {(props.sumbit ?? true) && <button style={{ display: "none" }} />}
            </form>
        </BasicContainer>
    )
}
//#endregion

//#region 表單控件內的列容器
/* 
   Date   : 2020-06-04 18:07:46
   Author : Arhua Ho
   Content: 表單控件內的列容器
*/
export const FormRow = (props) => {

    return (
        <Container theme={{ direction: "row" }}>
            {props.children}
        </Container >
    )
}


//#endregion

//#region 一般輸入框
//#region 一般輸入框框基底
/* 
   Date   : 2020-06-04 18:07:25
   Author : Arhua Ho
   Content: 一般輸入框框基底
*/
const TextInputBase = (props) => {
    //console.log(props)
    const ref = useRef();

    return (
        <>
            <SubContainer
                theme={props?.theme?.inputSubContainer}
                className={props.className} >
                {/* 輸入框 */}
                <BasicContainer theme={
                    props?.theme?.inputBasicContainer
                }>
                    <input autoComplete="off"
                        ref={ref}
                        name={props?.name}
                        disabled={props.disabled && "disabled"}
                        type={props.pass ? "password" : "text"}
                        value={props.value ?? ""}
                        onChange={props.onChange}
                        placeholder={props.placeholder} />
                    <BasicContainer theme={{
                        position: "absolute",
                        top: "0.5rem",
                        left: "0.5rem",
                        color: "#444",
                    }}>
                        {props.icon}
                    </BasicContainer>
                </BasicContainer>

            </SubContainer>
        </>
    )
}
//#endregion

//#region 輸入框組件 具一般輸入、顯示/隱藏密碼功能，請搭配useForm使用
/* 
   Date   : 2020-06-04 18:07:46
   Author : Arhua Ho
   Content: 輸入框，具一般輸入、顯示/隱藏密碼功能，請搭配useForm使用

*/
export const TextInput = styled(TextInputBase).attrs((props) => ({}))`
    //固定屬性

    input {
        box-sizing: border-box;
        position: ${props => props?.theme?.input?.inputPosition ?? 'relative'};
        height: ${props => props?.theme?.input?.inputHeight ?? 'initial'}; 
        line-height: ${props => props?.theme?.input?.inputHeight ? `calc( ${props.theme.input.inputHeight} - .8rem )` : 'initial'}; 
        width: 100%; 
        font-size: ${props => props?.theme?.input?.fontSize ?? 'initial'}; 
        border: ${props => props?.theme?.input?.border ?? '1px solid #444'};
        border-radius: ${props => props?.theme?.input?.borderRadius ?? '20px'};
        color: ${props => props?.theme?.input?.color ?? '#606266'};
        font-family: ${props => props?.theme?.input?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
        font-weight: ${props => props?.theme?.input?.fontWeight ?? '500'};
        letter-spacing: ${props => props?.theme?.input?.letterSpacing ?? '0.0075em'};
        text-align: ${props => props?.theme?.input?.textAlign ?? 'initial'};

        &:focus {
            outline: ${props => props?.theme?.input?.focusOutline ?? '1px solid #409eff00'};
            background-color: ${props => props?.theme?.input?.focusBackgroundColor ?? 'initial'};
        }
    }
`
//#endregion
//#endregion

//#region 一般下拉式選單
//#region 一般下拉式選單基底  
const SelectorBase = (props) => {

    const [OpenSelect, setOpenSelect] = useState(null);
    const [Select, setSelect] = useState({});//存放當頁所有id
    const ref = useRef();
    const { Theme } = useContext(Context);
    const { form } = Theme;

    useEffect(() => {
        let obj = {};
        (props.selectList ?? []).forEach((item, index) => (
            obj[item.key] = item.value
        ))
        setSelect(obj)
    }, [props.selectList])


    return (
        <SubContainer
            style={{
                ...(props.hidden ? { display: "none" } : {}),
                ...(props?.theme?.marginTop ? { marginTop: props.theme.marginTop } : { marginTop: "0rem" }),
                ...(props?.theme?.marginBottom ? { marginBottom: props.theme.marginBottom } : { marginBottom: "0rem" }),
                ...(props?.theme?.marginRight ? { marginRight: props.theme.marginRight } : { marginRight: "0.5rem" }),
                ...(props?.theme?.marginLeft ? { marginLeft: props.theme.marginLeft } : { marginLeft: "0.5rem" }),
            }}
            theme={{
                ...(props?.theme?.occupy ? { occupy: props.theme.occupy } : {}),
                ...(props?.theme?.height ? { height: props.theme.height } : { height: `calc( ${props.theme?.selector?.selectorHeight ?? "1.357rem"} + ${props.theme?.selector?.selectorHeight ?? "4rem"} * 0.25 )` }),
                //margin: `0 ${props?.theme?.marginRight ?? "0.5rem"} 0 ${props?.theme?.marginLeft ?? "0.5rem"}`,
            }}
            className={props.className} >
            {/* 左方Label */}
            {props.labelStart && <BasicContainer className={"labelStart"} >
                {props.labelStart}
            </BasicContainer>}
            {/* 下拉選單本體 */}
            <BasicContainer theme={{
                width: props?.theme?.selector?.selectorWidth ? `calc( ${props.theme.selector.selectorWidth} - .5rem )` : '14rem',
                display: "inline-block", backgroundColor: props?.theme?.selector?.backgroundColor ?? "initial", borderRadius: props?.theme?.selector?.borderRadius ?? '4px'
            }}>
                {/* <Text >下拉選單Input本體</Text> */}
                <input autoComplete="off" ref={ref} className={"selector"} name={props?.name} value={Select[props.value] ?? ""} disabled={props.disabled && "disabled"} readOnly="readonly" onBlur={() => { setOpenSelect(false) }} onClick={() => { setOpenSelect(!OpenSelect) }} placeholder={props.placeholder} ></input>
                <ArrowDropUpIconTrans
                    theme={{
                        animation: ((OpenSelect ?? "") === "") ? "" : (OpenSelect ? "iconIncrease .5s 1" : "iconDecrease .5s 1")
                        , color: props?.theme?.selector?.color ?? "#606266"
                    }}
                //onClick={() => {setOpenSelect(!OpenSelect); }}
                ></ArrowDropUpIconTrans>
                {!props.nonValid && <span className={`regSpan`}>{props.regExpResult}</span>}
                {/* 下拉選單 */}
                <BasicContainer theme={{ ...form.selectotUlContainer, display: (OpenSelect ? null : "none"), }}>
                    <Ul theme={form.selectotUl}>
                        {((props.selectList ?? []).length > 1 ? (props.selectList ?? []) : [{ key: undefined, value: "暫無資料" }]).map((item, index) => (
                            <Li key={index}
                                onMouseDown={
                                    () => {
                                        //當選擇的是查無資料則不對選中資料做任何改變
                                        if (!(item.key === undefined)) {
                                            props.onSelect(item.key);
                                        }
                                    }
                                }
                                theme={{ ...form.selectotLi, ...((item.key === props.value) ? { color: "#409eff" } : {}), ...(props?.theme?.selector?.selectorHeight ? { fontSize: `calc( ${props.theme.selector.selectorHeight} * 0.45 )` } : {}) }}
                                style={{ ...form.selectotInlineLi, padding: "0.25rem 0 0 0.5rem" }}>{item.value}</Li>
                        ))}
                    </Ul>
                </BasicContainer>
            </BasicContainer>
            {/* 左方Label */}
            {
                props.labelEnd && <BasicContainer className={"labelEnd"}>
                    {props.labelEnd}
                </BasicContainer>
            }

        </SubContainer >
    )
}
//#endregion

//#region 一般下拉式選單組件 
export const Selector = styled(SelectorBase).attrs((props) => ({}))`
 
.selector {
    cursor: default;
    box-sizing: border-box;
    z-index: 1;
    padding-right: 1rem;
    background-color: transparent;
    display: ${props => props?.theme?.labelEnd?.display ?? 'inline-block'};
    position: ${props => props?.theme?.selector?.selectorPosition ?? 'relative'};
    height: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} - .8rem )` : 'initial'}; 
    line-height: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} - .8rem )` : 'initial'}; 
    //width: ${props => props?.theme?.selector?.selectorWidth ? `calc( ${props.theme.selector.selectorWidth} - .5rem )` : '14rem'}; 
    width: 100%;
    font-size: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} * 0.45 )` : 'initial'}; 
    border: ${props => props.regExpResult ? props?.theme?.selector?.errorBorder ?? '1px solid #f56c6c' : props?.theme?.selector?.border ?? '1px solid #dcdfe6'};
    border-radius: ${props => props?.theme?.selector?.borderRadius ?? '4px'};
    color: transparent;
    text-shadow: ${props => props?.theme?.selector?.color ? `0 0 0 ${props.theme.selector.color}` : '0 0 0 #606266'};
    font-family: ${props => props?.theme?.selector?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
    font-weight: ${props => props?.theme?.selector?.fontWeight ?? '500'};
    letter-spacing: ${props => props?.theme?.selector?.letterSpacing ?? '0.0075em'};

    &:focus {
        outline: ${props => props.regExpResult ? (props?.theme?.selector?.selectorErrorOutline ?? (props?.theme?.selector?.errorBorder ?? '1px solid #f56c6c')) : props?.theme?.selector?.focusOutline ?? '1px solid #409eff'};
    }
}

.labelEnd {
    box-sizing: border-box;
    text-align: ${props => props?.theme?.labelEnd?.textAlign ?? 'left'};
    display: ${props => props?.theme?.labelEnd?.display ?? 'inline-block'};
    position: ${props => props?.theme?.labelEnd?.position ?? 'relative'};
    height: ${props => props?.theme?.labelEnd?.height ? `calc( ${props.theme.labelEnd.height} - .8rem )` : 'initial'}; 
    line-height: ${props => props?.theme?.labelEnd?.height ? `calc( ${props.theme.labelEnd.height} - .8rem )` : 'initial'}; 
    width: ${props => props?.theme?.labelEnd?.width ? `calc( ${props.theme.labelEnd.width} - .5rem )` : 'initial'}; 
    margin: ${props => props?.theme?.selector?.selectorMarginRight ? `0 0 0 ${props.theme.selector.selectorMarginRight}` : '0 0 0 0.5rem'}; 
    font-size: ${props => props?.theme?.labelEnd?.height ? `calc( ${props.theme.labelEnd.height} * 0.45 )` : 'initial'}; 
    border: ${props => props?.theme?.labelEnd?.border ?? 'initial'};
    border-radius: ${props => props?.theme?.labelEnd?.borderRadius ?? 'initial'};
    color: ${props => props?.theme?.labelEnd?.color ?? '#606266'};
    font-family: ${props => props?.theme?.labelEnd?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
    font-weight: ${props => props?.theme?.labelEnd?.fontWeight ?? '500'};
    letter-spacing: ${props => props?.theme?.labelEnd?.letterSpacing ?? '0.0075em'};
}

.labelStart {
    box-sizing: border-box;
    text-align: ${props => props?.theme?.labelStart?.textAlign ?? 'right'};
    display: ${props => props?.theme?.labelStart?.display ?? 'inline-block'};
    position: ${props => props?.theme?.labelStart?.position ?? 'relative'};
    height: ${props => props?.theme?.labelStart?.height ? `calc( ${props.theme.labelStart.height} - .8rem )` : 'initial'}; 
    line-height: ${props => props?.theme?.labelStart?.height ? `calc( ${props.theme.labelStart.height} - .8rem )` : 'initial'}; 
    width: ${props => props?.theme?.labelStart?.width ? `calc( ${props.theme.labelStart.width} - .5rem )` : 'initial'}; 
    margin: ${props => props?.theme?.selector?.selectorMarginLeft ? `0 ${props.theme.selector.selectorMarginLeft} 0 0` : '0 0.5rem 0 0'}; 
    font-size: ${props => props?.theme?.labelStart?.height ? `calc( ${props.theme.labelStart.height} * 0.45 )` : 'initial'}; 
    border: ${props => props?.theme?.labelStart?.border ?? 'initial'};
    border-radius: ${props => props?.theme?.labelStart?.borderRadius ?? 'initial'};
    color: ${props => props?.theme?.labelStart?.color ?? '#606266'};
    font-family: ${props => props?.theme?.labelStart?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
    font-weight: ${props => props?.theme?.labelStart?.fontWeight ?? '500'};
    letter-spacing: ${props => props?.theme?.labelStart?.letterSpacing ?? '0.0075em'};
}

.regSpan {
    display: inline-block;
    position: ${props => props?.theme?.regSpan?.position ?? 'absolute'};//absolute relative
    font-size: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} * 0.25 )` : '0.625rem'}; 
    color: ${props => props?.theme?.regSpan?.color ?? '#ff6347'};
    width : 100%;
    left: 0.3rem;
    top: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} - 0.5rem )` : '1.375rem'}; 
}
`
//#endregion

//#endregion

//#region 可搜尋式下拉選單 支援多選、單選
//#region 可搜尋式下拉選單基底 支援多選、單選
const SearchSelectorBase = (props) => {

    const { Theme } = useContext(Context);
    const { form } = Theme;
    const [Search, setSearch] = useState("");
    //const [InputFocus, setInputFocus] = useState(false);
    const [SelectList, setSelectList] = useState(props.selectList ?? []);
    const [SelectMapping, setSelectMapping] = useState({});//存放當頁所有id
    const [OpenSelect, setOpenSelect] = useState(null);

    useEffect(() => {
        let obj = {};
        (props.selectList ?? []).forEach((item, index) => (
            obj[item.key] = item.value
        ))
        setSelectMapping(obj)
        setSelectList(props.selectList)
    }, [props.selectList])

    const ref = useRef();

    //#region 處理搜尋與選中後的下拉選單
    let selectListHandler = (selectList) => {
        let res = (selectList ?? []).filter(it => (it.value.search(Search) > -1 && !(props.value ?? []).includes(it.key)));
        if (res.length > 0) {
            return res
        } else {
            return [{ key: undefined, value: "暫無資料" }]
        }
    }
    //#endregion

    return (
        <SubContainer
            style={{
                ...(props.hidden ? { display: "none" } : {}),
                ...(props?.theme?.marginTop ? { marginTop: props.theme.marginTop } : { marginTop: "0rem" }),
                //待調整錯誤訊息高度
                ...(props?.theme?.marginBottom ? { marginBottom: `calc(${props.theme?.marginBottom ?? "1.357rem"} + 1.357rem)` } : { marginBottom: "1.357rem" }),
                ...(props?.theme?.marginRight ? { marginRight: props.theme.marginRight } : { marginRight: "0.5rem" }),
                ...(props?.theme?.marginLeft ? { marginLeft: props.theme.marginLeft } : { marginLeft: "0.5rem" }),
            }}
            theme={{
                ...(props?.theme?.occupy ? { occupy: props.theme.occupy } : {}),
                //...(props?.theme?.height ? { height: props.theme.height } : { height: `calc( ${props.theme?.selector?.selectorHeight ?? "1.357rem"} + ${props.theme?.selector?.selectorHeight ?? "4rem"} * 0.25 )` }),
                //margin: `0 ${props?.theme?.marginRight ?? "0.5rem"} 0 ${props?.theme?.marginLeft ?? "0.5rem"}`,
            }}
            className={props.className} >
            {/* 左方Label */}
            {props.labelStart && <BasicContainer className={"labelStart"} >
                {props.labelStart}
            </BasicContainer>}
            {/* 下拉選單本體 */}
            <BasicContainer
                onClick={() => { ref.current.focus(); }}//1//4
                onFocus={() => {
                    //setOpenSelect(true)
                }}//3
                theme={form.SearchSelectorInputContainer(props, OpenSelect)}>
                <Container theme={{ direction: "row", alignItems: "center" }}>
                    {/* 沒東西要margin -0.32rem */}
                    {/* 遍歷選中項 */}
                    {(props.value ?? []).map((item, index) => (
                        <TagClose close={() => {
                            props.onSelect((s) => {
                                //標籤關閉時同時將選中項自陣列中移除
                                let arr = [...(s ?? [])]
                                let newArr = arr.filter((i) => (i !== item))
                                if (newArr.length === 0) { newArr = null }//重置無選中時為驗證成功邊框
                                return newArr;
                            })
                        }} key={index} theme={{ ...form.SearchSelectorTag }}>{SelectMapping[item] ?? ""}</TagClose>
                    ))}

                    <SubContainer>
                        <input
                            style={{ width: `${Search.length * 1.5 + 0.5}rem` }}
                            ref={ref}
                            autoComplete="off"
                            className={"search"}
                            name={props?.name}
                            value={Search}
                            disabled={props.disabled && "disabled"}
                            readOnly={(props?.search ?? true) ? false : "readonly"}  //作為搜尋開關，預設開啟
                            onFocus={() => {
                                setOpenSelect(true)
                            }}//2//5
                            onBlur={() => {
                                setOpenSelect(false);
                                setSearch("");
                            }}//3
                            onChange={(e) => { setSearch(e.target.value) }}
                            placeholder={props.placeholder} ></input>
                    </SubContainer>
                </Container>
                <ArrowDropUpIconTrans
                    theme={{
                        animation: ((OpenSelect ?? "") === "") ? "" : (OpenSelect ? "iconIncrease .5s 1" : "iconDecrease .5s 1"),
                        color: props?.theme?.selector?.color ?? "#606266"
                    }}
                //onClick={() => {setOpenSelect(!OpenSelect); }}
                ></ArrowDropUpIconTrans>
                {!props.nonValid && <span className={`regSpan`}>{props.regExpResult}</span>}
                {/* 下拉選單 */}
                <BasicContainer theme={{ ...form.selectotUlContainer, display: (OpenSelect ? null : "none"), }}>
                    <Ul theme={form.selectotUl}>
                        {(selectListHandler(SelectList)).map((item, index) => (
                            <Li key={index}
                                onMouseDown={() => {
                                    if (!(item.key === undefined)) {
                                        //當選擇的是查無資料則不對選中資料做任何改變
                                        if (props.multiple) {
                                            //如果是多選，則增加key至陣列
                                            props.onSelect((s) => {
                                                let arr = [...(s ?? [])]
                                                arr.push(item.key)
                                                return arr;
                                            })
                                        } else {
                                            //若為單選擇取代key
                                            props.onSelect([item.key])
                                        }
                                    }
                                }}
                                theme={{ ...form.selectotLi, ...((item.key === props.value) ? { color: "#409eff" } : {}), ...(props?.theme?.selector?.selectorHeight ? { fontSize: `calc( ${props.theme.selector.selectorHeight} * 0.45 )` } : {}) }}
                                style={{ ...form.selectotInlineLi, padding: "0.25rem 0 0 0.5rem" }}>{item.value}</Li>
                        ))}
                    </Ul>
                </BasicContainer>
            </BasicContainer >
            {/* 左方Label */}
            {
                props.labelEnd && <BasicContainer className={"labelEnd"}>
                    {props.labelEnd}
                </BasicContainer>
            }

        </SubContainer >
    )
}
//#endregion

//#region 可搜尋式下拉選單 支援多選、單選
export const SearchSelector = styled(SearchSelectorBase).attrs((props) => ({}))`
 
.search {
    box-sizing: border-box;
    z-index: 1;
    background-color: transparent;
    max-width: 100%;
    display: ${props => props?.theme?.labelEnd?.display ?? 'inline-block'};
    position: ${props => props?.theme?.selector?.selectorPosition ?? 'relative'};
    height: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} - .8rem )` : 'initial'}; 
    line-height: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} - .8rem )` : 'initial'}; 
    font-size: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} * 0.45 )` : 'initial'}; 
    border: 1px solid #f56c6c00;//隱藏邊框
    color: ${props => props?.theme?.selector?.color ?? '#606266'};
    font-family: ${props => props?.theme?.selector?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
    font-weight: ${props => props?.theme?.selector?.fontWeight ?? '500'};
    letter-spacing: ${props => props?.theme?.selector?.letterSpacing ?? '0.0075em'};

    &:focus {
        outline: 1px solid #f56c6c00;//隱藏邊框
    }
}

.labelEnd {
    box-sizing: border-box;
    text-align: ${props => props?.theme?.labelEnd?.textAlign ?? 'left'};
    display: ${props => props?.theme?.labelEnd?.display ?? 'inline-block'};
    position: ${props => props?.theme?.labelEnd?.position ?? 'relative'};
    height: ${props => props?.theme?.labelEnd?.height ? `calc( ${props.theme.labelEnd.height} - .8rem )` : 'initial'}; 
    line-height: ${props => props?.theme?.labelEnd?.height ? `calc( ${props.theme.labelEnd.height} - .8rem )` : 'initial'}; 
    width: ${props => props?.theme?.labelEnd?.width ? `calc( ${props.theme.labelEnd.width} - .5rem )` : 'initial'}; 
    margin: ${props => props?.theme?.selector?.selectorMarginRight ? `0 0 0 ${props.theme.selector.selectorMarginRight}` : '0 0 0 0.5rem'}; 
    font-size: ${props => props?.theme?.labelEnd?.height ? `calc( ${props.theme.labelEnd.height} * 0.45 )` : 'initial'}; 
    border: ${props => props?.theme?.labelEnd?.border ?? 'initial'};
    border-radius: ${props => props?.theme?.labelEnd?.borderRadius ?? 'initial'};
    color: ${props => props?.theme?.labelEnd?.color ?? '#606266'};
    font-family: ${props => props?.theme?.labelEnd?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
    font-weight: ${props => props?.theme?.labelEnd?.fontWeight ?? '500'};
    letter-spacing: ${props => props?.theme?.labelEnd?.letterSpacing ?? '0.0075em'};
}

.labelStart {
    box-sizing: border-box;
    text-align: ${props => props?.theme?.labelStart?.textAlign ?? 'right'};
    display: ${props => props?.theme?.labelStart?.display ?? 'inline-block'};
    position: ${props => props?.theme?.labelStart?.position ?? 'relative'};
    height: ${props => props?.theme?.labelStart?.height ? `calc( ${props.theme.labelStart.height} - .8rem )` : 'initial'}; 
    line-height: ${props => props?.theme?.labelStart?.height ? `calc( ${props.theme.labelStart.height} - .8rem )` : 'initial'}; 
    width: ${props => props?.theme?.labelStart?.width ? `calc( ${props.theme.labelStart.width} - .5rem )` : 'initial'}; 
    margin: ${props => props?.theme?.selector?.selectorMarginLeft ? `0 ${props.theme.selector.selectorMarginLeft} 0 0` : '0 0.5rem 0 0'}; 
    font-size: ${props => props?.theme?.labelStart?.height ? `calc( ${props.theme.labelStart.height} * 0.45 )` : 'initial'}; 
    border: ${props => props?.theme?.labelStart?.border ?? 'initial'};
    border-radius: ${props => props?.theme?.labelStart?.borderRadius ?? 'initial'};
    color: ${props => props?.theme?.labelStart?.color ?? '#606266'};
    font-family: ${props => props?.theme?.labelStart?.fontFamily ?? '"Arial", Microsoft JhengHei, "微軟正黑體", Helvetica, sans-serif'};
    font-weight: ${props => props?.theme?.labelStart?.fontWeight ?? '500'};
    letter-spacing: ${props => props?.theme?.labelStart?.letterSpacing ?? '0.0075em'};
}

.regSpan {
    display: inline-block;
    position: ${props => props?.theme?.regSpan?.position ?? 'absolute'};//absolute relative
    font-size: ${props => props?.theme?.selector?.selectorHeight ? `calc( ${props.theme.selector.selectorHeight} * 0.25 )` : '0.625rem'}; 
    color: ${props => props?.theme?.regSpan?.color ?? '#ff6347'};
    width : 100%;
    left: 0.3rem;
    bottom: -1.4rem;
}
`
//#endregion

//#endregion

