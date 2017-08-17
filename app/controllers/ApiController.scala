package controllers

import javax.inject._

import play.api._
import play.api.db.slick._
import play.api.mvc._
import play.api.libs.json._
import slick.jdbc.JdbcProfile

import scala.collection.mutable
import scala.concurrent.ExecutionContext

class ApiController @Inject() (cc: ControllerComponents, dbConfigProvider: DatabaseConfigProvider)(implicit executionContext: ExecutionContext) extends AbstractController(cc){
  val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig.profile.api._

  class Mappings(tag: Tag) extends Table[(Int, Float, Float, String)](tag, "mappings") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def pointX = column[Float]("point_x")
    def pointY = column[Float]("point_y")
    def wordMap = column[String]("word_map")

    def * = (id, pointX, pointY, wordMap)
  }

  val mappings = TableQuery[Mappings]

  implicit val mappingWrites = new Writes[(Int, Float, Float, String)] {
    def writes(mapping: (Int, Float, Float, String)) = Json.obj(
      "lat" -> mapping._2,
      "long" -> mapping._3,
      "word_map" -> mapping._4
    )
  }

  def search(q: String): Action[AnyContent] = Action.async {
    val searchResult = dbConfig.db.run(mappings.filter(_.wordMap === q).result)
    searchResult.map(res => {
      if (res.nonEmpty) Ok(Json.toJson(res.head))
      else Ok(Json.toJson("No result."))
    })
  }
}
