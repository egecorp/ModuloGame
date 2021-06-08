import React from 'react';
import SignInLanguagePanel from '../../Components/SignInLanguagePanel';
import {LanguageContext} from '../../Language/LangPack';
import HeadNavigation from '../../Components/HeadNavigation';


export default class RulesPage extends React.Component {
	constructor(props, context) {
	super(props);
	this.state = {};

	//this.changeItemState = this.changeItemState.bind(this);

	}

	render() { 
		

		return (
			<LanguageContext.Consumer>
				{(context) =>
				(
					<>
						<HeadNavigation>
							<button className="ButtonBack"></button>

							<p className="Title">{context.GetText('condition', 'labelWindow')}</p>

							<SignInLanguagePanel></SignInLanguagePanel>
						</HeadNavigation>
						
						<div className="RulesPage">
							<p classNamw="GeneralSubtitle">{context.GetText('condition', 'sublabelWindow')}</p>
								
							<div className="Content" data-shadow="both">

                                <h2>Играть в Modulo просто.</h2>

                                <p>В игре 5 раундов. У вас 8 карточек с числами от 2 до 9 и джокер (J).</p>

                                <p>В каждом раунде вы должны выбрать 3 карточки и расположить их на столе.
                                Ваш противник должен сделать тоже самое. Пока оба игрока не сделают ход, они видят только свои карточки.
                                Когда оба игрока сделают ход, карточки с числами открываются и происходит подсчёт очков.
                                </p>

                                <p>Подсчёт очков происходит следующим образом. 	
                                Карточки сравниваются согласно их позициям: 
                                ваша первая карточка играет против первой карточки, вторая - против второй.
                                </p>

                                <h3>Правило подсчёта простое: </h3>
                                <ol>
                                    <li>1. Если число на вашей карточке больше числа на карточке противника, 
                                    при этом оно не делится на него без остатка, 
                                    вы получаете количество очков, 
                                    равное остатку от деления вашего числа на число противника.
                                    То есть, если у вас число 5, а у противника - 3, то 5 поделить на 3 будет 1 и остаток - 2. 
                                    А значит, вы получите 2 очка, а противник не получит ничего</li>
                                    <li>2. Если же число на вашей карточке делится на число на карточке противника без остатка, 
                                    то вы не получите ничего, а противник получит частное от деления вашего числа на его.
                                    То есть, если у вас число 9, а у противника 3, то 9 поделить на 3 будет 3, а значит, 
                                    ваш противник получит 3 очка.</li>
                                    <li>3. Если же на карточках одинаковые числа, то никто ничего не получает.</li>
                                    <li>4. Во всех подсчётах карточка с джокером считается за число 11.</li>
                                </ol>
                                <ol>
                                Для карточки с джокером есть правило - использовать его можно не более чем один раз за игру,
                                и только в случае, если игрок использовал каждую карточку с числами от 2 до 9 хотя бы один раз.
                                </ol>

                                <h2>Сложности с подсчётами? </h2>
                                <p>Не беда, вы можете вести подсчёты, согласно таблице</p>

                                <table>
                                    <thead>
                                        <tr>
                                            <td colspan="2">Ход</td>
                                            <td colspan="2">Очки</td>
                                        </tr>
                                        <tr>
                                            <td>Вы</td>
                                            <td>Противник</td>
                                            <td>Ваши</td>
                                            <td>Противника</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>3</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>4</td>
                                            <td>2</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>5</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>6</td>
                                            <td>3</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>7</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>8</td>
                                            <td>4</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>9</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>J</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <th colspan="4"></th>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>2</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>3</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>4</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>5</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>6</td>
                                            <td>2</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>7</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>8</td>
                                            <td>0</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>9</td>
                                            <td>3</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>J</td>
                                            <td>0</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>2</td>
                                            <td>0</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <th colspan="4"></th>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>3</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>4</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>5</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>6</td>
                                            <td>0</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>7</td>
                                            <td>0</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>8</td>
                                            <td>2</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>9</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>J</td>
                                            <td>0</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <th colspan="4"></th>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>2</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>3</td>
                                            <td>2</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>4</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>5</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>6</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>7</td>
                                            <td>0</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>8</td>
                                            <td>0</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>9</td>
                                            <td>0</td>
                                            <td>4</td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>J</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <th colspan="4"></th>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>2</td>
                                            <td>0</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>3</td>
                                            <td>0</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>4</td>
                                            <td>2</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>5</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>6</td>
                                            <td>1</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>7</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>8</td>
                                            <td>0</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>9</td>
                                            <td>0</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>J</td>
                                            <td>0</td>
                                            <td>5</td>
                                        </tr>
                                        <tr>
                                            <th colspan="4"></th>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>2</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>3</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>4</td>
                                            <td>3</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>5</td>
                                            <td>2</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>6</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>7</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>8</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>9</td>
                                            <td>0</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>7</td>
                                            <td>J</td>
                                            <td>0</td>
                                            <td>4</td>
                                        </tr>
                                        <tr>
                                            <th colspan="4"></th>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>2</td>
                                            <td>0</td>
                                            <td>4</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>3</td>
                                            <td>2</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>4</td>
                                            <td>0</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>5</td>
                                            <td>3</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>6</td>
                                            <td>2</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>7</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>8</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>9</td>
                                            <td>0</td>
                                            <td>1</td>
                                        </tr>
                                        <tr>
                                            <td>8</td>
                                            <td>J</td>
                                            <td>0</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <th colspan="4"></th>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>2</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>3</td>
                                            <td>0</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>4</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>5</td>
                                            <td>4</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>6</td>
                                            <td>3</td>
                                            <td>0 </td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>7</td>
                                            <td>2</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>8</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>9</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>9</td>
                                            <td>J</td>
                                            <td>0</td>
                                            <td>2</td>
                                        </tr>
                                        <tr>
                                            <th colspan="4"></th>
                                        </tr>
                                        <tr>
                                            <td>J</td>
                                            <td>2</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>J</td>
                                            <td>3</td>
                                            <td>2</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>J</td>
                                            <td>4</td>
                                            <td>3</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>J</td>
                                            <td>5</td>
                                            <td>1</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>J</td>
                                            <td>6</td>
                                            <td>5</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>J</td>
                                            <td>7</td>
                                            <td>4</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>J</td>
                                            <td>8</td>
                                            <td>3</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>J</td>
                                            <td>9</td>
                                            <td>2</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>J</td>
                                            <td>J</td>
                                            <td>0</td>
                                            <td>0</td>
                                        </tr>
                                    </tbody>
                                </table>



							</div>
						</div>

						<div className="FooterArea">
							<button className="ButtonBig">{context.GetText('common', 'modalButtonClose')}</button>
						</div>
					</>
				)}
			</LanguageContext.Consumer>
		);
	}
}

RulesPage.contextType = LanguageContext;