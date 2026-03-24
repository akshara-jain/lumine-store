openapi: 3.1.0
info:
  title: Api
  version: 0.1.0
  description: LumineStore API specification
servers:
  - url: /api
    description: Base API path
tags:
  - name: health
    description: Health operations
  - name: products
    description: Product operations
  - name: collections
    description: Collection operations
  - name: cart
    description: Cart operations
  - name: newsletter
    description: Newsletter operations
paths:
  /healthz:
    get:
      operationId: healthCheck
      tags: [health]
      summary: Health check
      description: Returns server health status
      responses:
        "200":
          description: Healthy
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/HealthStatus"
  /products:
    get:
      operationId: listProducts
      tags: [products]
      summary: List all products
      parameters:
        - name: collectionId
          in: query
          required: false
          schema:
            type: integer
        - name: featured
          in: query
          required: false
          schema:
            type: boolean
        - name: limit
          in: query
          required: false
          schema:
            type: integer
      responses:
        "200":
          description: List of products
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Product"
  /products/{id}:
    get:
      operationId: getProduct
      tags: [products]
      summary: Get a product by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        "200":
          description: Product
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Product"
        "404":
          description: Not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"
  /collections:
    get:
      operationId: listCollections
      tags: [collections]
      summary: List all collections
      responses:
        "200":
          description: List of collections
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Collection"
  /cart:
    get:
      operationId: getCart
      tags: [cart]
      summary: Get cart items
      parameters:
        - name: sessionId
          in: query
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Cart with items
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Cart"
    post:
      operationId: addToCart
      tags: [cart]
      summary: Add item to cart
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/AddToCartRequest"
      responses:
        "200":
          description: Updated cart
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Cart"
  /cart/{cartItemId}:
    put:
      operationId: updateCartItem
      tags: [cart]
      summary: Update cart item quantity
      parameters:
        - name: cartItemId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UpdateCartItemRequest"
      responses:
        "200":
          description: Updated cart
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Cart"
    delete:
      operationId: removeCartItem
      tags: [cart]
      summary: Remove item from cart
      parameters:
        - name: cartItemId
          in: path
          required: true
          schema:
            type: integer
      responses:
        "200":
          description: Updated cart
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Cart"
  /newsletter:
    post:
      operationId: subscribeNewsletter
      tags: [newsletter]
      summary: Subscribe to newsletter
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/NewsletterSubscribeRequest"
      responses:
        "200":
          description: Subscribed
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/NewsletterSubscribeResponse"
components:
  schemas:
    HealthStatus:
      type: object
      properties:
        status:
          type: string
      required:
        - status
    Product:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        slug:
          type: string
        description:
          type: string
        shortDescription:
          type: string
        price:
          type: number
        comparePrice:
          type: number
          nullable: true
        images:
          type: array
          items:
            type: string
        collectionId:
          type: integer
          nullable: true
        collectionName:
          type: string
          nullable: true
        featured:
          type: boolean
        bestSeller:
          type: boolean
        badge:
          type: string
          nullable: true
        rating:
          type: number
        reviewCount:
          type: integer
        inventory:
          type: integer
        tags:
          type: array
          items:
            type: string
      required:
        - id
        - name
        - slug
        - description
        - shortDescription
        - price
        - images
        - featured
        - bestSeller
        - rating
        - reviewCount
        - inventory
        - tags
    Collection:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        slug:
          type: string
        description:
          type: string
        image:
          type: string
        productCount:
          type: integer
      required:
        - id
        - name
        - slug
        - description
        - image
        - productCount
    Cart:
      type: object
      properties:
        sessionId:
          type: string
        items:
          type: array
          items:
            $ref: "#/components/schemas/CartItem"
        subtotal:
          type: number
        total:
          type: number
        itemCount:
          type: integer
      required:
        - sessionId
        - items
        - subtotal
        - total
        - itemCount
    CartItem:
      type: object
      properties:
        id:
          type: integer
        productId:
          type: integer
        productName:
          type: string
        productImage:
          type: string
        price:
          type: number
        quantity:
          type: integer
        lineTotal:
          type: number
      required:
        - id
        - productId
        - productName
        - productImage
        - price
        - quantity
        - lineTotal
    AddToCartRequest:
      type: object
      properties:
        sessionId:
          type: string
        productId:
          type: integer
        quantity:
          type: integer
      required:
        - sessionId
        - productId
        - quantity
    UpdateCartItemRequest:
      type: object
      properties:
        sessionId:
          type: string
        quantity:
          type: integer
      required:
        - sessionId
        - quantity
    NewsletterSubscribeRequest:
      type: object
      properties:
        email:
          type: string
      required:
        - email
    NewsletterSubscribeResponse:
      type: object
      properties:
        success:
          type: boolean
        message:
          type: string
      required:
        - success
        - message
    ErrorResponse:
      type: object
      properties:
        error:
          type: string
      required:
        - error
